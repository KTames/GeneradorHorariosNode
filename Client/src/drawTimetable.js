function getIndexOfDay(d) {
    switch (d.toUpperCase()) {
        case "L":
            return 0;
        case "K":
            return 1;
        case "M":
            return 2;
        case "J":
            return 3;
        case "V":
            return 4;
        case "S":
            return 5;
        case "D":
            return 6;
        default:
            throw Error("Not recognized day: " + d);
    }
}

function getTop(h, hmenor, height) {
    let diferencia = h.h1 - hmenor;
    diferencia += h.m1 / 60;
    diferencia = diferencia * height + height;
    return diferencia;
}

function toMinutes(h) {
    return {"inicio": h.h1*60 + h.m1, "fin": h.h2*60 + h.m2};
}

function getHeight(h, height) {
    const minutes = toMinutes(h);
    const diferencia = minutes.fin - minutes.inicio;


    return (diferencia / 60) * height - 20;
}

function getLeft(d, width) {
   const i = getIndexOfDay(d);
   return width + i * width;
}

function drawTimeTable(heightPx, widthPx, horaMenor, horaMayor) {
    const cantLineas = horaMayor - horaMenor + 2;
    const container = document.createElement("div");
    container.style.position = "relative";
    container.style.display = "block";

    const table = document.createElement("table");
    const height = (heightPx * cantLineas).toString() + "px";
    const width = (widthPx * 8).toString() + "px";
    table.style.width = width;
    table.style.height = height ;

    const heightPerLine = heightPx;
    const widthPerDay = widthPx;

    const headers = document.createElement("tr");
    headers.innerHTML =
        "<th style='height: " + heightPerLine + "px'>Horas</th><th>Lunes</th><th>Martes</th><th>Miércoles</th><th>Jueves</th><th>Viernes</th><th>Sábado</th><th>Domingo</th>";
    table.append(headers);
    for (let i = horaMenor; i <= horaMayor; i++) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.style.width = widthPerDay.toString() + "px";
        td.innerHTML = i.toString()+ ":00";
        tr.append(td);
        for (let x = 0; x < 7; x++) tr.innerHTML += "<td style='width: " + widthPerDay.toString() + "px; height: " + heightPerLine + "px'></td>";
        table.append(tr);
    }
    table.style.position = "relative";
    table.className = "tHorario";
    container.append(table);
    return {container: container, widthPerDay: widthPerDay, heightPerLine: heightPerLine};
}

function getExtremos(horarios, horaMinima, horaMaxima) {
    let horaMenor = horaMinima;
    let horaMayor = horaMaxima;
    for (let i in horarios) {
        const horario = horarios[i];
        for (let k in horario) {
            if (horario[k].h1 < horaMenor) {
                horaMenor = horario[k].h1;
            }
            if (horario[k].h2 > horaMayor ) {
                horaMayor = horario[k].h2;
            }
        }
    }

    return {mayor: horaMayor, menor: horaMenor};
}

function setupSpan(span, width, height, top, left) {
    span.style.position = "absolute";
    span.style.display = "block";
    span.style.top = top;

    span.style.height = height;
    span.style.left = left;
    span.style.width = width;
    span.style.zIndex = "9";
    span.className = "hSpan";
    span.style.paddingTop = "10px";
    span.style.paddingBottom = "10px";
    span.style.paddingLeft = "10px";
    span.style.paddingRight = "10px";
    return span;
}


function drawSingleCourse(horario, heightPx = 35, widthPx = 100, horaMinima = 7, horaMaxima = 13) {
    const horas = getExtremos([horario], horaMinima, horaMaxima);

    const timeTable = drawTimeTable(heightPx, widthPx, horas.menor, horas.mayor);
    const container = timeTable.container;

    for (let k in horario) {
        const span = document.createElement("span");
        const d = horario[k];

        span.innerHTML += "<span class='hData'>" + d.h1 + ":" + zfill(d.m1, 2) + " - " + d.h2 + ":" + zfill(d.m2, 2) + "<br>Aula: " + d.a + "</span>";

        container.append(
            setupSpan(
                span,
                (timeTable.widthPerDay.toString() - 20) + "px",
                getHeight(d, timeTable.heightPerLine).toString() + "px",
                getTop(d, horas.menor, timeTable.heightPerLine).toString() + "px",
                getLeft(k, timeTable.widthPerDay).toString() + "px"
            )
        );
    }
    return container;
}

function extractRawTimes(horarios) {
    const raw = [];


    for (let k in horarios)
        for (let j in horarios[k])
            raw[raw.length] = horarios[k][j];

    return raw;
}

function drawMultipleCourses(horarios, heightPx = 35, widthPx = 100, horaMinima = 7, horaMaxima = 13) {
    const sContainer = document.createElement("div");

    for (let i = 0, horario = horarios[i]; i < horarios.length; horario = horarios[++i]){

        const horas = getExtremos(extractRawTimes(horario), horaMinima, horaMaxima);
        const timeTable = drawTimeTable(heightPx, widthPx, horas.menor, horas.mayor);
        const container = timeTable.container;

        for (let curso in horario) {


            for (let dia in horario[curso].horario) {

                const span = document.createElement("span");

                const d = horario[curso].horario[dia];

                span.innerHTML += "<span class='hData'>" +
                    "<b>" + curso + "</b><br>" +
                    d.h1 + ":" + zfill(d.m1, 2) + " - " + d.h2 + ":" + zfill(d.m2, 2) + "<br>Aula: " + d.a +
                    "</span>";
                container.append(
                    setupSpan(
                        span,
                        (timeTable.widthPerDay.toString() - 20) + "px",
                        getHeight(d, timeTable.heightPerLine).toString() + "px",
                        getTop(d, horas.menor, timeTable.heightPerLine).toString() + "px",
                        getLeft(dia, timeTable.widthPerDay).toString() + "px"
                    )
                );

            }
            const dataDiv = document.createElement("div");
            dataDiv.innerHTML = "<br><b>" + curso + "</b><br>"
            + "Grupos: ";
            for (let g = 0; g < horario[curso].grupos.length; g++) {
                dataDiv.innerHTML += horario[curso].grupos[g];
                if (g !== horario[curso].grupos.length - 1) dataDiv.innerHTML += " - ";
            }
            dataDiv.innerHTML += "<br><br>";
            container.append(dataDiv);
        }

        const header = document.createElement("h4");
        header.innerHTML = "Horario #" + (i+1).toString();
        const containerAndHeader = document.createElement("div");

        containerAndHeader.append(header);
        containerAndHeader.append(container);
        sContainer.append(containerAndHeader);
        sContainer.innerHTML += "<hr>"
    }

    return sContainer;
}