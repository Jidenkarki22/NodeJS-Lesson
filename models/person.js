const { uniqueId } = require('lodash');
const mongoose = require('mongoose');

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
    }
});

// Create Person model
const Person = mongoose.model('Person', personSchema);

module.exports = Person;
