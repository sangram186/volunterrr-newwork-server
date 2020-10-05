
const express = require('express')
const pass = 'UGr1GevkwTcSpDJc';
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://volunteerNetwork:UGr1GevkwTcSpDJc@cluster0.4dwcy.mongodb.net/volunteerNetwork?retryWrites=true&w=majority`;
const bodyParser = require('body-parser');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;

// https://gentle-everglades-23957.herokuapp.com/ 

const app = express()
app.use(cors());
app.use(bodyParser.json())


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const volunteers = client.db("volunteerNetwork").collection("volunteers");

  app.post('/addedOptions', (req, res) => {
    const selectedOption = req.body;
    volunteers.insertOne(selectedOption)
    
})

    app.get('/allData', (req, res) => {
        volunteers.find({})
        .toArray( (err, documents) => {
          res.send(documents)
        })
    })


    app.delete('/delete/:id', (req, res) => {
      volunteers.deleteOne({_id: ObjectId(req.params.id)})
    })

    app.delete('/deleteFromAdmin/:id', (req, res) => {
      volunteers.deleteOne({_id: ObjectId(req.params.id)})
    })

});


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(process.env.PORT || 4000)