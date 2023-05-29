const mongoose=require('mongoose')
const objectId=mongoose.Schema.Types.ObjectId;
const blogSchema= new mongoose.Schema({
     title: {
        type:String,
        minLength:1,
        maxLength:150,
        required:[true,"Please fill title"]
     },
     body: {
        type:mongoose.Schema.Types.Mixed,
        minLength:1,
        maxLength:10000,
        required:[true,"Please write something in your blog body"]
     }, 
     authorId: {
        type:objectId,
        required:[true,"Please fill the author id"],
        ref:'AuthorCollection'
     },
     tags: [String], 
     category: {
        type:String,
        minLength:1,
        maxLength:300,
        required:[true,"Please fill the categories"]
     }, 
     subcategory: [String], 
     deletedAt:{
        type:Date,
        default: null
     },
     isDeleted: {
        type:Boolean,
        default:'false'
     }, 
     publishedAt:{
        type: Date, 
        default: null
    },
     isPublished: {
        type:Boolean,
        default:'false'
     }
},{timestamps:true})
module.exports=mongoose.model("blogCollection",blogSchema)