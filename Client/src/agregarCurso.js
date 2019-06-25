function agregarCurso() {
    sendData(
        Links.addCourse($("#nombreCurso").val()),
        {},
        "GET",
        function (response) {
            console.log(response);
            if (response.hasOwnProperty('status'))
                if (response.status) {
                    alert("Se agregó con éxito");
                    $("#nombreCurso").val("");
                    loadCourses();
                }
                else
                    alert("No se pudo agregar");
            else
                alert("Ocurrió un error con el servidor");
        }
    );
}