const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// https://expressjs.com/en/resources/middleware/body-parser.html

// this line tells express to serve
// js or css files from frontend folder
app.use(express.static('frontend'))


// https://medium.com/@mmajdanski/express-body-parser-and-why-may-not-need-it-335803cd048c
app.use(express.urlencoded({extended: true})); 
app.use(express.json());   


app.get('/', (req, res) => res.sendFile(__dirname+'/frontend/html/home.html'))
app.get('/login', (req, res) => res.send('Login'))
app.get('/register', (req, res) => res.send('Register'))
app.get('/resume', (req, res) => res.sendFile(__dirname+'/frontend/html/resume.html'))
app.get('/pages/:pagename', (req, res) => res.sendFile(__dirname+'/frontend/html/'+ req.params.pagename+'.html'))

var student = {"name" : "Being Zero",
               "college" : "VNRVJIET",
               "regno": "112323232"};


app.get('/api/data', (req, res) => res.json(student))

var resumeObj = {
                    "name" : {"firstname" : "Being", "lastname" : "Zero"},
                    "description" : "Being Zero is a company incorporated by technocrats who believe education in India needs to be taken to next level through learn by doing approach.",
                    "email" : "beingzeroin@gmail.com",
                    "address": "15-24-MIG-493 · First Floor, KPHB Phase 3,  Hyderabad · +91-986-650-07367 ·",
                    "social": {
                        'twitter' : 'https://twitter.com/beingzero1',
                        'facebook' : 'https://www.facebook.com/being0',
                        'github': 'https://github.com/sandywadhwa',
                        'linkedin' : 'https://www.linkedin.com/company/13576644'
                    }
                };

app.get('/api/resumedata', (req, res) => res.json(resumeObj));


//res.sendFile
//res.json


app.listen(port, () => console.log(`Example app listening on port ${port}!`))