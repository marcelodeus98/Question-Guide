const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Files Database
const sequelize = require('./models/db');
const Question = require('./models/question');
const Answer = require('./models/answer');

let PORT = 8080;

// Use EJS 
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Use body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    Question.findAll({ raw: true, order: [
        ['id', 'DESC']
    ]}).then(questions => {
        res.render('home', {
            questions:questions
        });
    });
});

app.get('/question', (req, res) => {
    res.render
    ('question');
});

app.post('/submit_questions', (req, res) => {
    let title = req.body.title;
    let desc = req.body.description
    
    Question.create({
        title: title,
        description: desc,
    }).then(() => {
        res.redirect("/");
    }).catch((err) => {
        res.send("Err: The question was not sent!");
    });
});

app.get('/question/:id', (req, res) => {
    let id_question = req.params.id;

    Question.findOne({
        where: {id: id_question}
    }).then(question => {
        if(question != undefined){

            Answer.findAll({
                where: {questionId: id_question}
            }).then(answer => {
                res.render('answer', {
                    question : question,
                    answer: answer,               
                });
            });
        } else {
            res.redirect('/')
        }
    });
});

app.post('/answer', (req, res) => {
    let id = req.body.id_question;
    let body = req.body.body;

    Answer.create({
        body: body,
        questionId: id,
    }).then(() => {
        res.redirect(`question/${id}`);
    })
});

// CONNECT SERVER
app.listen(PORT, (err) => {
    if(err){
       console.log('Error loading server');
    }
    else{
        console.log(`Server is running in ${PORT}...`);
    }
});

// CONNECT DATABASE
sequelize.authenticate().then(() => {
    console.log('Connect with database, sucess!');
}).catch(() => {
    console.log('Error: Database not connect!');
})
