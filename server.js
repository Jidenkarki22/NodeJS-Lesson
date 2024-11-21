const express = require('express')
const app = express()
const db = require('./db');
require ('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());  //req.body

const PORT = process.env.PORT || 3000;

app.get('/', function (req, res) {
  res.send('Hello World ! Welcome to the Restaurant')
})

// Import the router files
const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes')

// use the routers
app.use('/person', personRoutes)
app.use('/menuItem', menuRoutes)


app.listen(PORT,()=>console.log('Server is Listening'))

