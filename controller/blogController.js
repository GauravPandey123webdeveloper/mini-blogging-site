const blogModel= require('../model/blogModel')
const authorModel = require('../model/authorModel')
const createBlog= async function(req,res){
    const blog=req.body
    const authorId=req.body.authorId
    const author= await authorModel.findOne({_id:authorId});
    if(!author){
        res.status(400).send({status:false, message:"authorId is not correct"})
    }
    else{
        try{
        const blogData= await blogModel.create(blog);
        res.status(201).send({status:true, data:blogData})
        }catch(err){
            res.status(400).send({status:false, message:"Please enter the require and valid data"})
        }
    }
}
const getBlog= async function(req,res){
    const authorId= req.query.auhtorId
    const category= req.query.category
    const subCat= req.query.subCategory
    const tag= req.query.tag
    if(!authorId){
    const blogData= await blogModel.find({isDeleted:'false',isPublished:'false'}).populate('authorId')
    if(blogData.length===0){
        res.send({status:false, message: "no blogs are availble"})
    }else{
        res.status(200).send({status:true, data:blogData})
    }
    }else{
    const blogData= await blogModel.find({isDeleted:'false',isPublished:'true'},{$or:{authorId:authorId,category:category,subCategory:subCat,tag:tag}})
    res.status(200).send({status:true, data:blogData})
    }
}
module.exports={createBlog,getBlog}