const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));


const port = 6001;

mongoose.connect('mongodb+srv://mohnish:1234@cluster0.tsbaxfy.mongodb.net/task', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((err) => {
    console.error(err);
});

const db = mongoose.connection;
db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"));

app.post("/rev", (req, res) => {
    const rating = req.body.rating;
    const review1 = req.body.review1;

    const data = {
        "rating": rating,
        "review": review1,
    };

    db.collection('review').insertOne(data, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Record Inserted Successfully");
            prompt("Record Inserted Successfully");
        }
    });
    return res.redirect('index.html');
});

// app.get("/", (req, res) => {
//     res.set({
//         "Allow-access-Allow-Origin": '*'
//     });
//     return res.redirect('review.html');
// }).listen(6001);

// console.log("Listening on PORT 6001");

app.listen(port, () => {
    console.log(`listening on port http://localhost:${port}`);
});