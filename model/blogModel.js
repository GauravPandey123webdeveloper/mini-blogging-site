const mongoose=require('mongoose')
const objectId=mongoose.Schema.Types.ObjectId;
const blogSchema= new mongoose.Schema({
     title: {
        type:String,
        required:true
     },
     body: {
        type:mongoose.Schema.Types.Mixed,
        required:true
     }, 
     authorId: {
        type:objectId,
        required:true,
        ref:'AuthorCollection'
     },
      tags: [String], 
     category: {
        type:String,
        required:true
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
        default:null
    },
     isPublished: {
        type:Boolean,
        default:'false'
     }
})
module.exports=mongoose.model("blogCollection",blogSchema)