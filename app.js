const express = require("express");
const app = express();
const path = require("path");
// const bodyparser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/eConnectOrder', {useNewUrlParser: true, useUnifiedTopology: true});
var port = process.env.PORT || 8000;

//MONGODB SPECIFIC STUFF
//Defining Mongoose Schema
const orderSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    description: String

});

const Order = mongoose.model('Order', orderSchema);
 
//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); //For serving static files.
app.use(express.urlencoded());

//END-POINTS
//SERVING THE WEB-CONTENT

//HOME
app.get('/', (req, res)=> {
    res.status(200).sendFile(__dirname+'/public/'+'index.html');
});

//ABOUT
app.get('/about', (req, res)=> {
    res.status(200).sendFile(__dirname+'/public/'+'about.html');
});

//SERVICE
app.get('/service', (req, res)=> {
    res.status(200).sendFile(__dirname+'/public/'+'services.html');
});

//CONTACT
app.get('/contact', (req, res)=> {
    res.status(200).sendFile(__dirname+'/public/'+'contact.html');
});

//GETTING ORDER INPUT 
app.post('/', (req, res)=> {
    var myData = new Order(req.body);
    myData.save().then(()=>{
        res.status(200).sendFile(__dirname+'/public/'+'index.html');
    }).catch(()=>{
        res.status(404).send("Error!!.Item was NOT saved.");
    });
});

// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});
