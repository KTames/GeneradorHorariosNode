function sendData(url, data, type="POST", successHandler = function (response) {}, errorHandler = function (error) {}) {
    $.ajax({
        url: url,
        type: type,
        data: data,
        success: successHandler,
        error: errorHandler
    });
}

