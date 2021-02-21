const express=require("express");
const path=require("path");
const app=express();
const port=8000;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true ,useUnifiedTopology: true });

//Defining mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
    
  });

  const contact = mongoose.model('contact', contactSchema);

//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static')); //For serving static files.
app.use(express.urlencoded());

//PUG SPECIFIC STUFF
app.set('view engine','pug');  //Set the template engine as pug.
app.set('views', path.join(__dirname,'views')); //Set the views directory.

//ENDPOINTS
app.get('/',(req,res)=>{

    res.status(200).render('index.pug');
});
app.get('/home',(req,res)=>{
    res.status(200).render('index.pug');
});

app.get('/contact',(req,res)=>{
  
    res.status(200).render('contact.pug');
});
app.get('/about',(req,res)=>{
  
    res.status(200).render('about.pug');
});
app.get('/services',(req,res)=>{
  
    res.status(200).render('services.pug');
});
app.get('/classInfo',(req,res)=>{
  
    res.status(200).render('classInfo.pug');
});


app.post('/contact',(req,res)=>{
  var myData = new contact(req.body);
  myData.save().then(()=>{
      res.send("This data has been saved to the database")
  }).catch(()=>{
      res.status(400).send("Item not saved to the database")
  });
   
});


//Start the server
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
});