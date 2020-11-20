const express = require("express");
const app = express();
const path = require("path");

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
// app.use(methodOverride('_method'));
// app.use(session({ secret: 'notagoodsecret' }));

// routes
app.get('/', (req, res) => {
    res.send('Home Page!');
});


const port = 8080 || process.env.PORT;
app.listen(port, () => {
    console.log(`port is at ${port}`);
});