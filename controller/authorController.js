//importing authorModel
const authorModel = require("../model/authorModel");
//importing jsonwebtoken for authentication
const jwt = require("jsonwebtoken");
//creating author
const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}
const isvalidTitle = function (title) {
    return ['Mr', 'Mrs', 'Miss', 'Mast'].indexOf(title) !== -1
}
const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}
const createAuthor = async function (req, res) {
    try {
        const author = req.body;
        if (!isValidRequestBody(author)) {
            res.status(400).send({ status: false, message: "invalid request parameters please provide author details" })
            return
        }
        const { fname, lname, title, email, password } = author
        if (!isValid(fname)) {
            res.status(400).send({ status: false, message: "first name is required" })
            return
        }
        if (!isValid(lname)) {
            res.status(400).send({ status: false, message: "Last name is required" })
            return
        }
        if (!isValid(title)) {
            res.status(400).send({ status: false, message: "title is required" })
            return
        }
        if (!isvalidTitle(title)) {
            res.status(400).send({ status: false, message: "Title should be among Mr, Mrs, Miss, Mast" })
            return
        }
        if (!isValid(email)) {
            res.status(400).send({ status: false, message: "Email is required" })
            return
        }
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            res.status(400).send({ status: false, message: "Email should be a valid email address" })
            return
        }
        if (!isValid(password)) {
            res.status(400).send({ status: false, message: "password is required" })
            return
        }
        
        const authorEmail = req.body.email;
        //checking author is available or not
        const availAuthor = await authorModel.findOne({ email: authorEmail });
        // if auhtor is available
        if (availAuthor) {
            res
                .status(400)
                .send({ status: false, message: "Author is already exist" });
        }
        //if author is not available then creating new author
        else {
            const createdAuthor = await authorModel.create(author);
            res.status(201).send({ status: true, data: createdAuthor });
        }
    } catch (error) {
        if (error.message.includes("validation")) {
            return res.status(400).send({ status: false, message: error.message })
        }
        else if (error.message.includes("duplicate")) {
            return res.status(400).send({ status: false, message: "emailId is not unique" })
        }
        else {
            return res.status(500).send({ status: false, message: error.message })
        }
    }
};
// getting all the authors
const getAuthor = async function (req, res) {
    const author = await authorModel.find();
    //if author is not available
    if (!author) {
        res.status(404).send({ status: false, message: "No author available" });
    }
    //if author is available
    else {
        res.status(200).send({ status: true, data: author });
    }
};
// creating login by generating jwt token
const userLogin = async function (req, res) {
    try {
        const validateData = await authorModel.findOne({
            email: req.body.email,
            password: req.body.password
        });
        // if credetials are incorrect
        if (!validateData) {
            return res
                .status(400)
                .send({ status: false, msg: "incorrect userName or password" });
        }

        const secretKey = "this-is-our-blogging-site-mini-project";
        // generating  jwt token
        const token = jwt.sign(
            {
                authorId: validateData._id.toString(),
                authorName: validateData.fname,
            },
            secretKey
        );
        //sending token to response header
        res.setHeader("x-api-key", token);
        res.status(200).send({ status: true, data: token });
    } catch (error) {
        res.status(500).send({ status: false, message: error });
    }
};
module.exports = { createAuthor, getAuthor, userLogin };
