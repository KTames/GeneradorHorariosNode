module.exports = function(modules) {
    const Courses = {};

    function courseExists(course, stack) {
        for (let i = 0; i < stack.length; i++)
            if (stack[i]["nombre"] === course) return true;
        return false;
    }

    function findCourseIndex(course, stack) {
        for (let i = 0; i < stack.length; i++)
            if (stack[i]["nombre"] === course) return i;
        return -1;
    }

    // localhost/addCourse/:id/:courseName
    Courses.addCourse = function(req, res) {

        const filename = 'Database/' + req.params.id + '.json';
        const courseName = req.params.courseName;
        const userData = modules.jsonFile.readFileSync(filename);
        if (courseExists(courseName, userData.cursos)) res.send({"status": false});
        else {
            userData.cursos[userData.cursos.length] = {"nombre": courseName, "horarios": []};
            modules.jsonFile.writeFileSync(filename, userData, {spaces: 2});
            res.send({"status": true});
        }
    };

    // {
    // "horario": {
    // "horario":
    // "curso":
    // "profesor":
    // }
    // }
    Courses.addHourToCourse = function(req, res) {
        const filename = 'Database/' + req.params.id + '.json';
        const courseName = req.params.courseName;
        const userData = modules.jsonFile.readFileSync(filename);
        const index = findCourseIndex(courseName, userData.cursos);
        if (index === -1) res.send({"status": false});
        else {
            const nHorario = req.body.horario;
            if (nHorario.hasOwnProperty("horario") && nHorario.hasOwnProperty("grupo") && nHorario.hasOwnProperty("profesor"))
            {

                const days = Object.keys(nHorario.horario);
                for (let i = 0; i < days.length; i++)
                    for (let k in nHorario.horario[days[i]])
                        if (k !== "a")
                            nHorario.horario[days[i]][k] = parseInt(nHorario.horario[days[i]][k]);

                userData.cursos[index].horarios[
                    userData.cursos[index].horarios.length
                    ] = nHorario;
                modules.jsonFile.writeFileSync(filename, userData, {spaces: 2});
                res.send({"status": true});
            } else res.send({"status": false});
        }
    };

    Courses.getTimeTables = function (req, res) {

        const cursos = modules.user.getCourses(req.params.id);
        if (cursos !== null)
            res.send(modules.generals.getTimetables(cursos));
        else
            res.send({"status": false});
    };

    Courses.getCourses = function (req, res) {

        const cursos = modules.user.getCourses(req.params.id);
        if (cursos !== null)
            res.send(cursos);
        else
            res.send({"status": false});
    };

    Courses.getHours = function(req, res) {
        const filename = 'Database/' + req.params.id + '.json';
        const courseName = req.params.courseName;
        const userData = modules.jsonFile.readFileSync(filename);

        const index = findCourseIndex(courseName, userData.cursos);
        if (index === -1) res.send({"status": false});
        else {
            res.send(userData.horarios[index]);
        }
    };

    return Courses;
};