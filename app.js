const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb+srv://admin:TriskelioN12@cluster0.o9j4k.mongodb.net/signals?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('connection open!');
    })
    .catch(() => {
    console.log('error');
    })

const Roster = require('./models/roster');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
// app.use(methodOverride('_method'));
// app.use(session({ secret: 'notagoodsecret' }));


// routes
app.get('/', (req, res) => {
    res.send('Home Page!');
});


// adding users
app.get('/adduser', (req, res) => {
    res.render('adduser');
});

app.post('/adduser', async (req, res) => {
    const { firstName, lastName, userName, password, isActive, isAdmin } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = new Roster({
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
});


app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    const roster = await Roster.findById(id)
    res.render('viewuser', { roster })
})



const port = 8080 || process.env.PORT;
app.listen(port, () => {
    console.log(`port is at ${port}`);
});