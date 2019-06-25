module.exports = function(modules) {
    const Hours = {};

    function dropLeftZeros (s) {
        let reachedNumber = false;
        let o = "";
        for (let i = 0; i < s.length; i++) {
            if (!reachedNumber)
                if (s[i] === "0") continue;

            if (s[i] !== " ") o += s[i];
        }

        if (o === "") return "0";
        else return o;
    }

    function stoi(s) {
        const i = parseInt(s);

        if (i.toString() === s || i.toString() === dropLeftZeros(s))
            return i;
        else
            throw Error("Could not convert string \"" + s + "\" to integer");
    }


    //
    // Hours.splitTimetable = function(data) {
    //     const len = data.length;
    //
    //     // Storing
    //     let hora1 = "";
    //     let minuto1 = "";
    //
    //     let hora2 = "";
    //     let minuto2 = "";
    //
    //     let aula = "";
    //
    //     // Flags
    //     let ph = false;
    //     // Terminó de agregar la primer hora
    //     let pm = false;
    //     // Terminó de agregar los primeros minutos
    //     let sh = false;
    //     // Igual pero con las segundas horas y minutos
    //     let sm = false;
    //
    //     for (let i = 0; i < len; i++) {
    //         if (data[i] === ":")
    //             if (ph && pm && !sh)
    //                 sh = true;
    //             else if ((ph && !pm) || (sh))
    //                 return {"status": false};
    //             else
    //                 ph = true;
    //         else if (data[i] === "-")
    //             if (pm || !ph)
    //                 return {"status": false};
    //             else
    //                 pm = true;
    //         else if (data[i] === "|")
    //             if (ph && pm && sh)
    //                 sm = true;
    //             else
    //                 return {"status": false};
    //         else {
    //             if (!ph) hora1 += data[i];
    //             else if (!pm) minuto1 += data[i];
    //             else if (!sh) hora2 += data[i];
    //             else if (!sm) minuto2 += data[i];
    //             else aula += data[i];
    //         }
    //     }
    //
    //     try {
    //         return {"h1": stoi(hora1), "m1": stoi(minuto1), "h2": stoi(hora2), "m2": stoi(minuto2), "a": aula};
    //     } catch (e) {
    //         return {"status": false};
    //     }
    // };

    Hours.timetableEquals = function(h1, h2) {
        const keys = Object.keys(h1);

        if (keys !== Object.keys(h2)) return false;

        for (let i = 0; i < keys.length; i++) {
            if(h1[keys[i]] !== h2[keys[i]]) return false;
        }

        return true;
    };

    return Hours;
};