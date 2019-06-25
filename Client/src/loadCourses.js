function restartSelectOptions() {
    $("#toCourse").html("");
}

function addOptionToSelect(option, value) {
    const opt = document.createElement("option");
    opt.innerHTML = option;
    opt.value = value;
    document.getElementById("toCourse").append(opt);
}

function loadCourses() {
    restartSelectOptions();
    sendData(
        Links.getCourses(),
        {},
        'get',
        function (cursos) {
            // console.log(cursos);
            const actuales = document.getElementById("cursosActuales");
            actuales.innerHTML = "";
            for (let i = 0; i < cursos.length; i++) {
                const nombre = document.createElement("h1");
                nombre.innerHTML = cursos[i].nombre;
                actuales.append(nombre);
                addOptionToSelect(cursos[i].nombre, cursos[i].nombre);

                const table = document.createElement("table");
                table.innerHTML = "<tr><th>Grupo</th><th>Profesor</th><th>Horario</th></tr>";

                for (let j = 0; j < cursos[i].horarios.length; j++) {
                    const h = cursos[i].horarios[j];
                    const tr = document.createElement("tr");
                    tr.innerHTML += "<td>" + h.grupo + "</td>";
                    tr.innerHTML += "<td>" + h.profesor + "</td>";

                    const horario = document.createElement("td");
                    horario.style.padding = "1rem";
                    horario.append(drawSingleCourse(h.horario));

                    tr.append(horario);
                    table.append(tr);
                }
                table.attributes.border =  1;
                table.className = "tbCursos";

                const emptyCourse = document.createElement("h3");
                emptyCourse.innerHTML = "El curso está vacío";
                emptyCourse.style.textAlign = "center";
                if ($(table).children().length > 1)
                    actuales.append(table);
                else
                    actuales.append(emptyCourse);
            }

            if ($("#toCourse").children().length === 0) {
                addOptionToSelect("Agrega un curso primero");
            }
        }
    );
}

window.onload = loadCourses;