const express =  require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.json()); // this is a middleware, it will parse the body of the request and if there is a json object in the body, it will parse it and set req.body property
app.use(middleware);
app.use(customLogger);

app.get('/courses', (req, res) => { //  this is a callback, when server gets a get request with /courses, it will execute this function
    const courses = readCoursesFromFile();
    res.json(courses);
});

// this code just runs the code, but nothing happens
// we have not created a server yet

app.listen(3000, () => {
    console.log('Listening on port 3000...')
});

// add one more course to courses using post request
app.post('/courses', (req, res) => {
    const courses = readCoursesFromFile();
    console.log(req.body);
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    writeCoursesToFile(courses);
    res.json(course);
});

// make a put call t update id to 10
// make a delete call to delete id 3

app.put('/courses/:id', (req, res) => {
    const courses = readCoursesFromFile();
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found');

    course.name = req.body.name;
    writeCoursesToFile(courses);
    res.json(course);
});

app.delete('/courses/:id', (req, res) => {
    const courses = readCoursesFromFile();
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found');

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    writeCoursesToFile(courses);
    res.json(course);
});

function middleware(req, res, next) {
    console.log('Middleware called');
    next();
}

function customLogger(req, res, next){
    console.log('Custom Middleware called');
    console.log(
        'Request Type:', req.method, 'Request IS:', req.ip, 'Request HostName:', req.hostname, 'Request Date:', new Date());
    next();
};

const coursesFilePath = path.join(__dirname, 'courses.json');

function readCoursesFromFile() {
    const data = fs.readFileSync(coursesFilePath, 'utf-8');
    return JSON.parse(data);
}

function writeCoursesToFile(courses) {
    fs.writeFileSync(coursesFilePath, JSON.stringify(courses, null, 2));
}

