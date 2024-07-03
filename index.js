const express =  require('express');
const app = express();

app.use(express.json()); // this is a middleware, it will parse the body of the request and if there is a json object in the body, it will parse it and set req.body property
app.use(middleware);

let courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
];

app.get('/courses', (req, res) => { //  this is a callback, when server gets a get request with /courses, it will execute this function
    res.json(courses);
});

// this code just runs the code, but nothing happens
// we have not created a server yet

app.listen(3000, () => {
    console.log('Listening on port 3000...')
});

// add one more course to courses using post request
app.post('/courses', (req, res) => {
    console.log(req.body);
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.json(course);
});

// make a put call t update id to 10
// make a delete call to delete id 3

app.put('/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found');

    course.name = req.body.name;
    res.json(course);
});

app.delete('/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.json(course);
});

function middleware(req, res, next) {
    console.log('Middleware called');
    next();
}

const customLogger = (req, res, next) => {
    console.log('Custom Middleware called');
    console.log(
        'Request Type:', req.method, 'Request IS:', req.ip, 'Request HostName:', req.hostname, 'Request Date:', new Date());
    next();
};

app.use(customLogger);