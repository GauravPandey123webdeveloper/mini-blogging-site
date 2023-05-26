const AuthorModel = require('../model/authorModel');
const jwt = require('jsonwebtoken');
// const authorModel = require('../model/authorModel')
const createAuthor = async function (req, res) {
    try {
        const author = req.body
        const authorEmail = req.body.email
        const availAuthor = await AuthorModel.findOne({ email: authorEmail })
        if (availAuthor) {
            return res.send("Author is already exist")
        }
        const email = req.body.email;
        const passwordRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!passwordRegex.test(email)) {
            return res.status(400).send({ msg: "invalid email" });
        }
        const createdAuthor = await AuthorModel.create(author)
        res.status(201).send({ status: true, data: createdAuthor })
    } catch (error) {
        res.status(500).send({err: error})
    }

}
const getAuthor = async function (req, res) {
    const author = await AuthorModel.find();
    if (!author) {
        res.status(404).send("No author available")
    }
    else {
        res.send({ status: true, data: author })
    }
}

const userLogin = async function (req, res) {
    try {
        const validateData = await AuthorModel.findOne({email: req.body.email, password: req.body.password});
        if(!validateData) {
            return res.status(404).send({msg: "incorrect userName and password"});
        }
        const secretKey = 'this-is-our-blogging-site-mini-project';
        const token = jwt.sign({
            authorId: validateData._id.toString(),
            authorName: validateData.fname
        }, secretKey);
        res.status(200).send({status: true, data: token});
        //token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JJZCI6IjY0NmZhYTQwODRmMTQ4MTE5Njg3ZTMxNSIsImF1dGhvck5hbWUiOiJSdXNoaWtlc2giLCJpYXQiOjE2ODUwNzk5NDJ9.mqf-JjYjiWWB1n_shKGS0guExyliDP7NTS0zY2mMcOs
    } catch (error) {
        res.status(500).send({err: error})
    }
}
module.exports = { createAuthor, getAuthor, userLogin }