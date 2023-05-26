const authorModel = require('../model/authorModel')
const createAuthor = async function (req, res) {
    const author = req.body
    const authorEmail = req.body.email
    const availAuthor = await authorModel.findOne({ email: authorEmail })
    if (availAuthor) {
        res.send("Author is already exist")
    } else {
        try {
            const createdAuthor = await authorModel.create(author)
            res.status(201).send({ status: true, data: createdAuthor })
        } catch (err) {
            res.status(400).send("Please fill required data")
        }
    }
}
const getAuthor = async function (req, res) {
    const author = await authorModel.find();
    if (!author) {
        res.status(404).send("No author available")
    }
    else {
        res.send({ status: true, data: author })
    }
}
module.exports = { createAuthor, getAuthor }