const express = require('express')
const app = express()
const db = require('./db');
require ('dotenv').config();
const passport = require('./Authentication/passport')

const bodyParser = require('body-parser');
app.use(bodyParser.json());  //req.body

const PORT = process.env.PORT || 3000;

//Middleware Function
const logRequest  =(req,res,next)=> {
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
  next(); //Move on to the next phase
}

app.use(logRequest);

app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local',{session:false})

app.get('/', function (req, res) {
    res.send('Hello World ! Welcome to the Restaurant')
  })


// Import the router files
const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes')

// use the routers
app.use('/person',localAuthMiddleware, personRoutes)
app.use('/menuItem', menuRoutes)


app.listen(PORT,()=>console.log('Server is Listening'))

