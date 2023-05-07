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
    client.subscribe('ir/value1');
    client.subscribe('ir/value2');
    client.subscribe('ir/value3');
    client.subscribe('ir/value4');    
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
  

state1 = '';
state2 = '';
state3 = '';
state4 = '';

client.on('message', (topic1, message) => {
    if (topic1 === 'ir/value1') {
        console.log('Received data:', message.toString());
        var data = message.toString();
        if(data=='Car1 parked'){
            state1='Car parked';
        }
        else{
            state1='Slot empty';
        }
        const filter = { id: 1 };
        const update = { data: state1 };
        const result =  Parking.findOneAndUpdate(filter, update).exec();
    }
});


client.on('message', (topic2, message2) => {
    if (topic2 === 'ir/value2') {
        console.log('Received data:', message2.toString());
        var data = message2.toString();
        if(data=='Car2 parked'){
            state2='Car parked';
        }
        else{
            state2='Slot empty';
        }
        const filter = { id: 2 };
        const update = { data: state2 };
        const result =  Parking.findOneAndUpdate(filter, update).exec();
    }
});


client.on('message', (topic3, message3) => {
    if (topic3 === 'ir/value3') {
        console.log('Received data:', message3.toString());
        var data = message3.toString();
        if(data=='Car3 parked'){
            state3='Car parked';
        }
        else{
            state2='Slot empty';
        }
        const filter = { id: 3 };
        const update = { data: state3 };
        const result =  Parking.findOneAndUpdate(filter, update).exec();
    }
});

client.on('message', (topic4, message4) => {
    if (topic4 === 'ir/value4') {
        console.log('Received data:', message4.toString());
        var data = message4.toString();
        if(data=='Car4 parked'){
            state4='Car parked';
        }
        else{
            state4='Slot empty';
        }
        const filter = { id: 4 };
        const update = { data: state4 };
        const result =  Parking.findOneAndUpdate(filter, update).exec();
    }
});


app.post('/success1',(req,res)=>{
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

  app.post('/success2',(req,res)=>{
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
  updateDocument("643c3253c009c52e6ba589b2yy");
  })

  app.post('/success3',(req,res)=>{
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
  updateDocument("643c3253c009c52e6ba589b3");
  })

  app.post('/success4',(req,res)=>{
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
  updateDocument("643c3253c009c52e6ba589b4");
  })

app.listen(port, () => {
    console.log(`listening on port http://localhost:${port}`);
});