const mqtt = require('mqtt');
const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');


const Parking = require('./models/carparking');

const app = express();

mongoose.connect('mongodb+srv://mohnish:1234@cluster0.tsbaxfy.mongodb.net/task', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Successfully connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });



app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



const port = 5001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

client.on('connect', () => {
    console.log('mqtt connected');
    client.subscribe('ir/value');
});

app.get('/parking', (req, res) => {
    Parking.find({})
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.log('Error getting parking Data', error);
            res.status(500).send('Error getting parking data');
        })
});


state = '';

client.on('message', (topic, message) => {
    if (topic === 'ir/value') {
        console.log('Received data:', message.toString());
        var data = message.toString();
        if (data == 'Car parked') {
            state = 'Car parked';
        }
        else {
            state = 'Slot empty';
        }
        const filter = { id: 1 };
        const update = { data: state };
        const result = Parking.findOneAndUpdate(filter, update).exec();
    }
});

app.post('/success', (req, res) => {
    const updateDocument = async (_id) => {
        try {
            const result = await Parking.updateOne({ _id }, {
                $set: {
                    data: "Slot Booked"
                }
            });

            console.log(result);
        } catch (err) {
            console.log(err);
        }
    }
    updateDocument("643c3253c009c52e6ba589b5");
})

app.listen(port, () => {
    console.log(`listening on port http://localhost:${port}`);
});