const express = require("express");
// require("dotenv").config();
const path = require("path");
const app = express();
const ejs = require("ejs");
const mongoose  = require("mongoose") ;

// const { error } = require("console");
const User = require('./mongodb')

mongoose.connect('mongodb://127.0.0.1:27017/Studentdata')

.then( ()=>
{
    console.log("mongodb connected")
})

.catch( (err) =>
{
    console.log(error)
})
app.use(express.json())
app.set('view engine','ejs')
app.use('/static', express.static(path.join(__dirname,'public')))
// app.use('/assests', express.static(path.join(__dirname,'public/assests')))
app.use(express.urlencoded({extended:false}))


const port = process.env.PORT||3000

app.get('/',(req,res) =>
{
  res.render('base', {titl:"login System"})
})


app.get('/register',(req , res) =>
{
  res.render("register")
})

app.post ("/register" , async(req, res)=>
{
  const data = 
  {
    name: req.body.name,
    email : req.body.email,
    password : req.body.password
  }
    
  await User.insertMany([data])

    res.render("base")

})
app.post ("/login" , async(req, res)=>
{
  try
  {
    const check = await User.findOne({email: req.body.email})
    if(check.password === req.body.password )
    {
      res.render("dashhboard")
    }
    else
    {
    res.send("wrong password")
    }
  }
   catch
   {
    res.send("wrong details")
   }
  
})

app.listen(port,()=>(console.log("lstening on the server on http://localhost:3000")));
