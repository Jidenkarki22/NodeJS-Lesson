const mongoose = require('mongoose');
require ('dotenv').config();


//Define the MongoDb connection URL
const mongoURL = process.env.MONGODB_URL

//Set up MongoDb connection
mongoose.connect(mongoURL, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})

//Get the default connection 
// Mongoose maintains a defualt connection object representing in the MongoDB connection.
const db = mongoose.connection;

// Define event listeners for database connection 

db.on('connected',()=>{
    console.log('Connected to MongoDB Server')
})
db.on('error',(err)=>{
    console.log('MongoDB connection error', err)
})
db.on('disconnected',()=>{
    console.log('MongoDB Disconnected')
})

// Export the Database Connection

module.exports = {db};