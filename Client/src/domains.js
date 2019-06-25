const Links = {};
Links.domain = "http://localhost:637";

Links.addHourToCourse = function (course) {
    return Links.domain + "/addHourToCourse/1/" + course;
};

Links.addCourse = function (course) {
    return Links.domain + "/addCourse/1/" + course;
};

Links.getCourses= function () {
    return Links.domain + "/getCourses/1";
};

Links.generate = function () {
    return Links.domain + "/getTimeTables/1";
};