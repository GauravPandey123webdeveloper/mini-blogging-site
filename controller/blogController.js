//importing blogModel for database creation
const blogModel = require('../model/blogModel')
//importing authorModel for database match
const authorModel = require('../model/authorModel')
// creating blog 
const createBlog = async function (req, res) {
    const blog = req.body
    try {
        const authorId = req.body.authorId
        // getting author data
        const author = await authorModel.findOne({ _id: authorId });
        // if author is not available then returning an error message
        if (!author) {
            res.status(400).send({ status: false, message: "authorId is not correct" })
        }
        // if author id is correct then creating the blog
        else {
            const blogData = await blogModel.create(blog);
            res.status(201).send({ status: true, data: blogData })
        }
    }
    catch (error) {
        if (error.message.includes("validation")) {
            return res.status(400).send({ status: false, message: error.message })
        }
        else {
            return res.status(500).send({ status: false, message: error.message })
        }
    }
}
// getting blogs based on the condition 
const getBlog = async function (req, res) {
    try{
    //getting all the details from query params
    const authorId = req.query.authorId;
    const category = req.query.category;
    const subCat = req.query.subcategory;
    const tags = req.query.tags;
//if user didn't provided any query 
    if (!authorId && !category && !subCat && !tags) {
        const blogData = await blogModel.find({ isDeleted: false, isPublished: true })
        if (blogData.length === 0) {
            res.status(404).send({ status: false, message: "No blogs are available." });
        } else {
            res.status(200).send({ status: true, data: blogData });
        }
    } 
    // if user has provided queries in query param 
    else {
        const filters = {};
    // inserting all the entered data of query param in filter object
        if (authorId) filters.authorId = authorId;
        if (category) filters.category = category;
        if (subCat) filters.subcategory = { $in: subCat };
        if (tags) filters.tags = { $in: tags };
// return only those blogs which are not deleted and has published
        const blogData = await blogModel.find({$and:[{isDeleted:false},{isPublished:true},filters]})
        res.status(200).send({ status: true, data: blogData });
    }
}catch(err){
    res.status(500).send({status:false, message:err})
}
};
// updating blog
const updateBlog = async function (req, res) {
    const { title, body, tags, category, subcategory } = req.body;
    const blogId = req.params.blogId;
    if(!tags||!subcategory){
       return res.status(400).send({status:false, message:"tags and subcategory can't be empty"})
    }
          //main code if id is valid 
    try {
        const updatedBlog = await blogModel.findOneAndUpdate(
            { _id: blogId, isDeleted: false },
            {
                $set: { title, body,category,isPublished: true,publishedAt: Date.now()
                },
                $push: { tags, subcategory: { $each: subcategory } }
            },
            { new: true }
        );
//  if blog didn't updated
        if (!updatedBlog) {
            return res.status(404).send({ status: false, message: "Blog does not exist or has been deleted." });
        }
        
        return res.status(200).send({ status: true, data: updatedBlog });
    } catch (error) {
        return res.status(500).send({ status: false, message: "Internal server error." });
    }
};

// deleting blog by path param
const deleteBlogByParam = async function (req, res) {
    try{
    const id = req.params.blogId
    const blog = await blogModel.findOne({ _id: id, isDeleted: 'true' })
    if (!blog) {
        const deletedBlog = await blogModel.findOneAndUpdate({ _id: id }, { $set: { isDeleted: 'true', deletedAt: Date.now() } })
        res.status(200).send({ status: true, message: "deleted successfully" })
    } else {
        res.status(404).send({ status: true, message: "blog not found" })
    }
}catch(err){
    res.status(500).send({status:false, message:"internal server error"})
}
}
// deleting blog by query param 
const deleteBlogByQuery = async function (req, res) {
    try{
    let qparams = req.query;
    qparams.isDeleted = 'false';
    let deletedData = await blogModel.updateMany(qparams, { isDeleted: true })
    let deletedCount = deletedData.modifiedCount;
    if (deletedCount != 0) {
        return res.status(200).send({ status: true, msg: `deleted ${deletedCount} blog` })
    }
    return res.status(404).send({ status: false, msg: "no data is found to be deleted" })
    }catch(err){
        res.status(500).send({status: false, message:" internal server error"})
    }
}
module.exports = { createBlog, getBlog, updateBlog, deleteBlogByParam, deleteBlogByQuery }