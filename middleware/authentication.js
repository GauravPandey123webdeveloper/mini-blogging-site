const jwt = require('jsonwebtoken');
const BlogModel = require('../model/blogModel');
const AuthorModel = require('../model/authorModel');
const mongoose = require('mongoose');
const verifyToken = async function (req, res, next) {
    try {
        const token = req.headers['x-api-key'];
        console.log(token);
        if (!token) {
            return res.status(401).send({ msg: "unauthorized person" });
        }
        const decoded = jwt.verify(token, 'this-is-our-blogging-site-mini-project');
        if (!decoded) {
            return res.status(401).send({ msg: "unauthorized person" });
        }
        req.decoded = decoded;
        console.log("you are verified");
        next();
    } catch (error) {
        res.status(500).send({ status: false, errorType: error.name, errorMsg: error.message })
    }

}

const authorityToCreate = async function (req, res, next) {
    try {
        
        if (req.decoded.authorId !== req.body.authorId) {
            return res.status(403).send({ status: false, msg: "You are not authorized to do this task" })
        }
        console.log("you have authority to create");
        next();
    } catch (error) {
        res.status(500).send({ status: false, errorType: error.name, errorMsg: error.message });
    }
}

const protectedApi = async function (req, res, next) {
    try {
        // if (!mongoose.Types.ObjectId.isValid(req.params.blogId)) {
        //     return res.status(403).send({ msg: "please provide valid blogId" });
        // }
        const blogId = req.params.blogId;
        console.log(blogId);
        const check = await BlogModel.findById(blogId);
        console.log(check);
        if (!check) {
            return res.status(404).send({ status: false, msg: "Blog not found" })
        }
        console.log(check);
        console.log(req.decoded.authorId);
        console.log(check.authorId.toString());
        if (req.decoded.authorId != check.authorId.toString()) {
            return res.status(403).send({ status: false, msg: "You are not authorized to do this task" });
        }
        next();
    } catch (error) {
        res.status(500).send({ status: false, errorType: error.name, errorMsg: error.message })
    }
}

module.exports = { verifyToken, authorityToCreate, protectedApi };