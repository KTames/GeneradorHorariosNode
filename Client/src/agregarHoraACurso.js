const cursoActual = {
    "horario": {
        "grupo": "",
        "horario": {
        },
        "profesor": ""
    }
};

function reiniciarTodo() {
    // $("#nuevoGrupo").val("");
    // $("#nuevoProfesor").val("");
    $("#nuevoDia").val("L");
    $("#eliminarNuevoDia").val("L");
    $("#nuevaHoraInicio").val("0");
    $("#nuevaHoraFin").val("0");
    $("#nuevosMinutosInicio").val("0");
    $("#nuevosMinutosFin").val("0");

    cursoActual.horario.grupo = "";
    cursoActual.horario.profesor = "";
    cursoActual.horario.horario = {};
}

function drawTemp() {
    const d = document.getElementById("horarioTemp");
    d.innerHTML = "";
    d.append(drawSingleCourse(cursoActual.horario.horario));
}

function agregarHora() {
    const curso = $("#toCourse").val();
    console.log(curso);
    const profesor = $("#nuevoProfesor").val();
    const grupo = $("#nuevoGrupo").val();

    cursoActual.horario.profesor = profesor;
    cursoActual.horario.grupo = grupo;

    console.log(cursoActual);

    sendData(
        Links.addHourToCourse(curso),
        cursoActual,
        "POST",
        function (response) {
            console.log(response);
            if (response.hasOwnProperty('status'))
                if (response.status === true) {
                    setTimeout(function() {
                        reiniciarTodo();
                        drawTemp();
                        loadCourses();
                        $("#toCourse").val(curso);
                    }, 0); // Timeout para cargar de forma asincrónica
                    alert("Se agregó con éxito");
                }
                else
                    alert("No se pudo agregar");
            else
                alert("Ocurrió un error al conectar con el servidor");
        }
    );
}

function agregarTemp() {
    const dia = $("#nuevoDia").val();
    let obj = cursoActual.horario.horario[dia];
    console.log(obj);
    if (obj === undefined || confirm("Ya existe un horario ese día. ¿Desea sobreescribirlo?")) {
        obj = {};
        obj.h1 = parseInt($("#nuevaHoraInicio").val());
        obj.m1 = parseInt($("#nuevosMinutosInicio").val());

        obj.h2 = parseInt($("#nuevaHoraFin").val());
        obj.m2 = parseInt($("#nuevosMinutosFin").val());

        obj.a = $("#aulaNueva").val();

        // obj.profesor = $("#nuevoProfesor").val();
        // obj.grupo = $("#nuevoGrupo").val();
        cursoActual.horario.horario[dia] = obj;
        drawTemp();
    }
}

function eliminarTemp() {
    const dia = $("#eliminarNuevoDia").val();
    let o = cursoActual.horario.horario[dia];
    if (o !== undefined) {
       o = cursoActual.horario.horario;
       const n = {};
       for (let k in o)
           if (k !== dia) n[k] = o[k];
       cursoActual.horario.horario = n;
    } else {
        alert("No hay horarios para ese día");
    }
    drawTemp();
}