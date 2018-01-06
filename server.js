const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://bymak:Fr4nkT4rd06@ds121696.mlab.com:21696/star-wars-quotes-tut";
const app = express();
let db;

MongoClient.connect(uri, (err,database) => {
    //start the server
    if(err) return console.log(err);
    db = database;
   
    app.listen(3000, () => {
        console.log("listening on 3000 mongo");
    });
    
 
});
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/quotes', (req, res) => {
    db.db('star-wars-quotes-tut').collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err);

        console.log("saved to database");
        res.redirect('/')
    });
});

app.get('/', (req, res) => {
    db.db('star-wars-quotes-tut').collection('quotes').find().toArray(function (err, results) {
        if (err) return console.log(err);
        //renders index.ejs
        console.log(results);
        res.render('index.ejs', { quotes: results });
    })

})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});



console.log("May the server be with you");