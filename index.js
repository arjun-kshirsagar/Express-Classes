const express =  require('express');
const app = express();

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