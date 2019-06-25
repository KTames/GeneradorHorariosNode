module.exports = function(modules) {
    const HourTests = {};
    HourTests.printTest = function(data, func) {
        console.log("Entrada: ");
        console.log(data);
        console.log("Salida: ");
        console.log(func(data));
    };



    HourTests.run = function () {
        // console.log(modules.hours.timetableEquals());
        // console.log(modules.generals.compareObjects({"K": [1, 2, 3, {"J": 1}], "3": 1}, {"K": [1, 2, 3, {"J": 2}], "3": 100}, ["J", "3"]));
        // return modules.generals.centralize({
        //         "nombre": "Bases De Datos",
        //         "horarios": [
        //             {
        //                 "grupo": "1",
        //                 "horario": {
        //                     "K": {
        //                         "h1": 7,
        //                         "m1": 30,
        //                         "h2": 9,
        //                         "m2": 0,
        //                         "a": "27"
        //                     },
        //                     "J": {
        //                         "h1": 7,
        //                         "m1": 30,
        //                         "h2": 9,
        //                         "m2": 0,
        //                         "a": "32"
        //                     }
        //                 },
        //                 "profesor": "Esteban Arias"
        //             },
        //             {
        //                 "grupo": "2",
        //                 "horario": {
        //                     "K": {
        //                         "h1": 7,
        //                         "m1": 30,
        //                         "h2": 9,
        //                         "m2": 0,
        //                         "a": "27"
        //                     },
        //                     "J": {
        //                         "h1": 7,
        //                         "m1": 30,
        //                         "h2": 9,
        //                         "m2": 0,
        //                         "a": "32"
        //                     }
        //                 },
        //                 "profesor": "Esteban Arias"
        //             },
        //             {
        //                 "grupo": "3",
        //                 "horario": {
        //                     "M": {
        //                         "h1": 7,
        //                         "m1": 30,
        //                         "h2": 9,
        //                         "m2": 0,
        //                         "a": "27"
        //                     },
        //                     "V": {
        //                         "h1": 7,
        //                         "m1": 30,
        //                         "h2": 9,
        //                         "m2": 0,
        //                         "a": "32"
        //                     }
        //                 },
        //                 "profesor": "Esteban Arias"
        //             }
        //         ]
        //     });
    };
    return HourTests;
};