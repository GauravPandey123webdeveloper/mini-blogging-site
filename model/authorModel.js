const mongoose = require('mongoose');

const Author = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    title: {
        type: String,
        enum: ['Mr', 'Mrs', 'Miss']
    },
    email: {
        type: String,
        required: true,
        unique: true,
      
    },
    password: {
        type: String,
        required: true
    }


});
const AuthorModel = mongoose.model('AuthorModel', Author);
module.exports = AuthorModel;