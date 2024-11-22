const { uniqueId } = require('lodash');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

// Define the Person Schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String, // Fixed typo from `tyype` to `type`
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    },
    username:{
        required:true,
        type: String
    },
    password:{
        required:true,
        type:String
    }
});

personSchema.pre('save',async function(next){

    const person = this;
    
    //hash the password only if it has been modifief (or is new)
    if(!person.isModified('password')) 
        return next();

    try{
        //password hash generate
        const salt = await bcrypt.genSalt(10);

        //hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);

        //override the plain password with the hashed one
        person.password = hashedPassword;
        next();

    }catch(err){
        return next(err)
    }
})

personSchema.methods.comparedPassword = async function(candidatePassword){
    try {
        //use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch
        
    } catch (error) {
        throw error
    }
}

// Create Person model
const Person = mongoose.model('Person', personSchema);

module.exports = Person;
