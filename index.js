const express = require('express');
const app = express();

app.use(logger);
app.use(middleware);
app.use(express.json());

let courses = [
    {id: 1, name: "java"},
    {id: 2, name: "javascript"},
    {id: 3, name: "python"}
];

app.get('/courses', (req, res) => {
    res.json(courses);
});

app.post('/courses', (req, res) => {
    console.log(req.body);
    let singleCourse = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(singleCourse);
    res.send(courses);
})

app.put('/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) 
        return res.status(404).send('The course with the given ID was not found.');
    course.name = req.body.name; res.json(course);
}); 

app.delete('/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');
    const index = courses.indexOf(course); courses.splice(index, 1); res.json(course);
});

function middleware(req, res, next){
    console.log("called");
    next();
}

//logger 
//method, ip, hostname, date

function logger(req, res, next) {
    const method = req.method;
    const ip = req.ip;
    const hostname = req.hostname;
    const date = new Date().toISOString();
    console.log(`METHOD:${method} IP:${ip} HOST:${hostname} DATE:${date}`); next();
    }

app.listen(3000, () => {
    console.log("server started")
});