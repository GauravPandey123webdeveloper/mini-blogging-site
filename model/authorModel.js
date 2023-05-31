const mongoose = require('mongoose')
const authorSchema = new mongoose.Schema({
    fname: {
        type: String,
        trim: true,
        required: "Please fill first name"
    },
    lname: {
        type: String,
        trim: true,
        required: "Please fill last name"
    },
    title: {
        type: String,
        required: "Please fill title",
        enum: ['Mr', 'Mrs', 'Miss']
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: {
            validator: function (email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            }, message: "please fill a valid email address", async: false
        }

    },
    password: {
        type: String,
        // minLength:8,
        // maxLength:30,
     trim:true,
        // required:[true,"Please fill the password"]
        required: "please fill the password"
    }
})
module.exports = mongoose.model("AuthorCollection", authorSchema)