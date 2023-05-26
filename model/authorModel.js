const mongoose=require('mongoose')
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const authorSchema= new mongoose.Schema({
    fname: {
        type:String,
        required:[true,"Please fill first name"]
    },
    lname: {
        type:String,
        required:[true,"Please fill last name"]
    },
    title:{
        type:String,
        required:[true,"Please fill title"],
        enum:['Mr','Mrs','Miss']
    },
    email:{
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type:String,
        required:[true,"Please fill the password"]
    }
})
module.exports=mongoose.model("AuthorCollection",authorSchema)