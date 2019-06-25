function generarHorarios() {
    sendData(
        Links.generate(),
        {},
        "GET",
        function (response)
        {
            const r = drawMultipleCourses(response);
            const d = document.getElementById("horariosGenerados");
            d.style.width = "90%";
            d.innerHTML = "";
            d.append(r);
            // $(d).dialog({
            //     title: "Horarios generados",
            //     width: 1000,
            //     hide: "slideUp",
            //     modal: true,
            //     buttons: [
            //         {
            //             text: "Cerrar",
            //             click: function () {
            //                 $(this).dialog("close");
            //             }
            //         }
            //     ]
            // });
            $(d).show();
        },
        function (error)
        {
            console.log(error);
        }
    )
}