/**** APPLICATION INITIALIZATION ****/
const express = require('express');
const app = express();
const port = 637;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept');
    next();
});
/**** MODULES INITIALIZATION ****/
const Modules = require('./src/Modules')();

const User = require('./src/User')(Modules.get());
Modules.addModule('user', User);

const Hours = require('./src/Hours')(Modules.get());
Modules.addModule('hours', Hours);

const HoursTest = require('./Tests/HourTests')(Modules.get());
Modules.addModule('hoursTest', HoursTest);

const Courses = require('./src/Courses')(Modules.get());

/**** ROUTES INITIALIZATION ****/
app.get('/addUser/:id', User.init);

app.get('/addCourse/:id/:courseName', Courses.addCourse);
app.post('/addHourToCourse/:id/:courseName', Courses.addHourToCourse);

app.get('/getTimetables/:id', Courses.getTimeTables);
app.get('/getCourses/:id', Courses.getCourses);
app.get('/getHours/:id/:courseName', Courses.getHours);


/**** TESTS ****/
app.get('/runHourTests', function(req, res) {
    res.send(HoursTest.run());
});

// HoursTest.run();
/**** SERVER INITIALIZATION ****/
app.listen(port);
console.log(`Esperando en el puerto ${port}`);