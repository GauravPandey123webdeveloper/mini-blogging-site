const BlogModel = require('../model/blogModel');
const AuthorModel = require('../model/authorModel');


//1.Create a blog document from request body. Get authorId in request body only.

//2.Make sure the authorId is a valid authorId by checking the author exist in the authors collection.
const createBlog = async function (req, res) {
    try {
        const authorId = req.body.authorId;
        const checkValidAuthId = await AuthorModel.findById(authorId);
        if (!checkValidAuthId) {
            return res.status(404).json({ status: false, msg: "incorrect authorId " })
        }
        // const email = req.body.email;
        // const passwordRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        // if (!passwordRegex.test(email)) {
        //     return res.status(400).send({ msg: "invalid email" });
        // }
        
        const creatData = await BlogModel.create(req.body);
        return res.status(201).json({ status: true, data: creatData });
    } catch (error) {
        return res.status(500).json({ status: false, ErrorType: error.name, ErrorMsg: error.message });
    }
}

//GET /blogs
// Returns all blogs in the collection that aren't deleted and are published
const getBlogs = async function (req, res) {
    try {
        const queryParam = req.query;
        console.log(queryParam);
        const getData = await BlogModel.find({$and: [{isPublished: true}, {authorId:queryParam.authorId}]});
        console.log(getData);
        if (getData.length == 0) {
            return res.status(400).send({ status: false, msg: "Blog dosn't exist" });
        }
        return res.status(200).send({ status: true, data: getData });
    } catch (error) {
        return res.status(500).json({ status: false, ErrorType: error.name, ErrorMsg: error.message });
    }

}


//Updates a blog by changing the its title, body, adding tags, adding a subcategory. 
//(Assuming tag and subcategory received in body is need to be added)
const updateBlog = async function (req, res) {
    try {
        const blogId = req.params.blogId;
        const reqParam = req.body;
        const validateDoc = await BlogModel.findById(blogId);
        console.log(validateDoc);
        if (!validateDoc) {
            return res.status(404).send({ msg: "document does not found" });
        }
        const updateData = await BlogModel.findByIdAndUpdate(blogId, { $set: { title: reqParam.title, body: reqParam.body }, $push: { tags: reqParam.tags, subCategory: reqParam.subcategory } });
        console.log(updateData);
        if (!updateData) {
            return res.status(403).send({ msg: "not able to updateData data" });
        }
        return res.status(200).send({ status: true, msg: "update operation complete" });
    } catch (error) {
        return res.status(500).json({ status: false, ErrorType: error.name, ErrorMsg: error.message });

    }
}

const delteBlog = async function (req, res) {
    try {
        const id = req.params.id;
        console.log(id);
        const getData = await BlogModel.findById(id);
        console.log(getData);
        if (!getData) {
            return res.status(404).send({ msg: "document does not found" });
        }
        const deleteData = await BlogModel.findByIdAndUpdate(id, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true });
        console.log(deleteData);
        if (!deleteData) {
            return res.status(403).send({ msg: "not able to delete data" });
        }
        return res.status(200).send({ status: true, msg: "delete operation complete" });
    } catch (error) {
        return res.status(500).json({ status: false, ErrorType: error.name, ErrorMsg: error.message });

    }
}

const deleteByQuery = async function (req, res) {
    try {
        const queryParam = req.query;
        const findData = await BlogModel.findOne({ authorId: req.query.authorId }, { ...queryParam });
        if (!findData) {
            return res.status(404).send({ msg: "insert valid data" });
        }

        const deleteData = await BlogModel.findOneAndUpdate({ ...queryParam, isDeleted: false }, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true });
        if (!deleteData) {
            return res.status(403).send({ msg: "not able to delete data" });
        }
        return res.status(200).send({ status: true, msg: "delete operation complete" });
    } catch (error) {
        return res.status(500).json({ status: false, ErrorType: error.name, ErrorMsg: error.message });

    }

}
module.exports = { createBlog, getBlogs, updateBlog, delteBlog, delteBlog, deleteByQuery }