require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const articleRouter = require('./routes/articles');
const userRouter = require('./routes/user');
//const userRouter = require('./routes/users');
const methodoverride = require('method-override');
const app = express();

const url = process.env.ATLAS_URL;
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => { console.log("MongoDB Connected")})
.catch(err => console.log(err))

// view engine setup

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false})) //
app.use(methodoverride('_method')) // setting param '_method' will override POST/GET method of form and allow delete method to be set in a form
app.use(express.json())
app.use('/uploads', express.static('uploads'));
app.use('/articles', articleRouter) // Use the Article route
app.use('/user', userRouter) // User route
//app.use('/users', userRouter) 



const port = process.env.PORT || 5000;


app.get('/' , (req, res) => {

    res.render('home')
   
})
app.get('/donate' , (req, res) => {

    res.render('supporter')
   
})
app.get('/partners' , (req, res) => {

    res.render('partners')
   
})

app.listen(port , ()=> {
    console.log(`Server is runing on port: ${port}`);
});
