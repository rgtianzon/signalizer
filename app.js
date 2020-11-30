const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');

mongoose.connect('mongodb+srv://admin:TriskelioN12@cluster0.o9j4k.mongodb.net/signals?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('connection open!');
    })
    .catch(() => {
    console.log('error');
    })

const Roster = require('./models/roster');
const { isNull } = require("util");

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// app.use(methodOverride('_method'));
// app.use(session({ secret: 'notagoodsecret' }));


// routes
app.get('/', (req, res) => {
    res.send('Home Page!');
});


// adding users
app.get('/adduser', async (req, res) => {
    const roster = await Roster.find({})
    res.render('user/adduser', { roster });
});

app.post('/adduser', async (req, res) => {
    const roster = await Roster.find({})
    req.body.sigID = roster[roster.length - 1].sigID + 1;
    const existUserName = await Roster.find({userName: req.body.userName});
    if (existUserName[0] == null) {
        const { sigID, firstName, lastName, userName, password, isActive, isAdmin } = req.body;
        const hash = await bcrypt.hash(password, 12);
        const user = new Roster({
            sigID,
            firstName,
            lastName,
            userName,
            password: hash,
            isActive,
            isAdmin
        })
        await user.save()
            .then(() => {
            res.redirect(`/users/${user._id}`)
        })
    } else {
        res.send(`Username ${req.body.userName} is already taken!`)
    }
});


app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    const roster = await Roster.findById(id)
    res.render('user/viewuser', { roster })
})

app.get('/taskoverride', async (req, res) => {
    res.render('taskoverride');
})

app.get('/managetask', async (req, res) => {
    res.render('managetask');
})

const port = 8080 || process.env.PORT;
app.listen(port, () => {
    console.log(`port is at ${port}`);
});