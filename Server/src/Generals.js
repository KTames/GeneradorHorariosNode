module.exports = function() {
    const Generals = {};

    Generals.compareObjects = function(o, p, excludeKeys = []) {
        const keys1 = Object.keys(o);
        const keys2 = Object.keys(p);

        if (keys1.length !== keys2.length) return false;

        for (let i = 0; i < keys1.length; i++) {
            if (keys1[i] !== keys2[i]) return false;
            if (excludeKeys.indexOf(keys1[i]) !== -1) continue;

            const o1 = o[keys1[i]];
            const p1 = p[keys1[i]];

            const k1 = Object.keys(o1);
            const k2 = Object.keys(p1);

            if (k1.length !== k2.length) return false;

            if (k1.length !== 0) {if (!Generals.compareObjects(o1, p1, excludeKeys)) return false;}
            else if (o1 !== p1) return false;
        }

        return true;
    };

    function centralize(course) {
        const data = {};
        data.nombre = course.nombre;
        data.horarios = [];
        for (let x in course.horarios) {
            const h = course.horarios[x];
            let added = false;
            for (let i in data.horarios) {
                if (Generals.compareObjects(h.horario, data.horarios[i].horario, ["a"])) {
                    added = true;
                    data.horarios[i].grupos[data.horarios[i].grupos.length] = h.grupo;
                    break;
                }
            }
            if (!added) {
                const nhorario = {};
                nhorario.horario = h.horario;
                nhorario.grupos = [];
                nhorario.grupos[0] = h.grupo;
                data.horarios[data.horarios.length] = nhorario;
            }
        }
        return data;
    }

    Generals.centralize = centralize;

    function getAllCentralized (courses) {
        const data = [];
        for (let i = 0; i < courses.length; i++) {
            const centralized = centralize(courses[i]);
            if (centralized.horarios.length > 0) data[data.length] = centralized;
        }
        return data;
    }

    function toMinutes(h) {
        // Retorna la cantidad de minutos que han transcurrido desde la medianoche de las horas de inicio y final de un curso
        const d = {};
        d.inicio = h.h1 * 60 + h.m1;
        d.fin = h.h2 * 60 + h.m2;
        return d;
    }

    function valid(h1, h2) {
        // Retorna true si las horas no están en conflicto
        const x = toMinutes(h1);
        const y = toMinutes(h2);
        return x.inicio >= y.fin || x.fin <= y.inicio;
    }

    Generals.valid = valid;

    // h1, h2 ~~ {"K":{"h1":7,"m1":30,"h2":9,"m2":0,"a":"27"},"J":{"h1":7,"m1":30,"h2":9,"m2":0,"a":"32"}}
    function crash(h1, h2) {
        for (let x in h1) {
            for (let y in h2) {
                if (x === y) {
                    if (!valid(h1[x], h2[y])) return true;
                }
            }
        }
        return false;
    }

    function getLengths(centralizedCourses) {
        // Retorna cuántas horas distintas tiene cada curso centralizado
        const lengths = [];
        const count = [];
        for (let k in centralizedCourses) {
            lengths[k] = centralizedCourses[k].horarios.length;
            count[k] = 0;
        }
        return {"lengths": lengths, "count": count};
    }

    function increaseCount(lengths) {
        lengths.count[lengths.count.length - 1] ++;

        for (let i = lengths.lengths.length - 1; i >= 0; i--) {
            if (lengths.lengths[i] === lengths.count[i]) {
                lengths.count[i] = 0;
                if (i > 0)
                    lengths.count[i-1] ++;
                else
                    return null;
            }
        }

        return lengths;
    }

    function areFull(lengths) {
        for (let x in lengths.lengths)
            if (lengths.lengths[x] !== lengths.count[x]) return false;
        return true;
    }

    function createTimetables(centralizedCourses) {
        const timetables = [];
        let lengths = getLengths(centralizedCourses);

        while (lengths !== null && !areFull(lengths)) {
            const data = {};

            for (let i = 0; i < centralizedCourses.length; i++) {
                const c = centralizedCourses[i];
                data[c.nombre] = c.horarios[lengths.count[i]];
            }

            timetables[timetables.length] = data;
            lengths = increaseCount(lengths);
        }
        return timetables;
    }

    function getValidTimetables(timetables) {
        const validTimetables = [];
        for (let x in timetables) {
            let _crash = false;
            const t = timetables[x];
            const k = Object.keys(t);


            for (let i = 0; i < k.length; i++) {
                for (let j = i + 1; j < k.length; j++) {
                    if (crash(t[k[i]].horario, t[k[j]].horario)) {
                        _crash = true;
                        break;
                    }
                }
                if (_crash) break;
            }

            if (!_crash)
                validTimetables[validTimetables.length] = t;
        }
        return validTimetables;
    }

    // {"nombre":"Bases De Datos","horarios":[{"horario":{"K":{"h1":7,"m1":30,"h2":9,"m2":0,"a":"27"},"J":{"h1":7,"m1":30,"h2":9,"m2":0,"a":"32"}},"grupos":["1","2"]},{"horario":{"M":{"h1":7,"m1":30,"h2":9,"m2":0,"a":"27"},"V":{"h1":7,"m1":30,"h2":9,"m2":0,"a":"32"}},"grupos":["3"]}]}
    /*
        timetables = [
        {
        "Bases de datos": {"horario": x, "grupos": y},
        "Análisis": {"horario": x, "grupos": y},
        },
        {
        "Bases de datos": {"horario": x, "grupos": y},
        "Análisis": {"horario": x, "grupos": y},
        }
        ];
         */
    Generals.getTimetables = function(courses) {
        const centralizedCourses = getAllCentralized(courses);
        const timetables = createTimetables(centralizedCourses);

        return getValidTimetables(timetables);
    };

    return Generals;
};