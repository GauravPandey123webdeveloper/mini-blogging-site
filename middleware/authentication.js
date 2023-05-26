const jwt = require('jsonwebtoken')
const blogModel = require('../model/blogModel')
const userModel = require('../model/authorModel')
// checking authentication
const authentication = async function (req, res, next) {
    try {
        let token = req.headers['x-api-key'];
        if (!token) {
            res.status(401).send({ status: false, message: "token must be present " });
        } else {
            const decodedToken = jwt.verify(token, 'this-is-our-blogging-site-mini-project')
            if (!decodedToken) {
                res.status(401).send({ status: false, message: "verification failded" })
            } else {
                req.decodedToken = decodedToken
                next()
            }
        }
    } catch (err) {
        res.status(401).send({ status: false, message: "Authentication failed" })
    }
}
// checking the authorisation by authorid
const authorisation = async function (req, res, next) {
    try {
        const bId = req.params.blogId
        const id = await blogModel.findOne({ _id: bId }).select({ _id: 0, authorId: 1 })
        const qid = req.query.authorId
        const decId = req.decodedToken.authorId
        if (!bId) {
            if (qid == decId) {
                next()
            } else {
                res.status(403).send({ status: false, message: " You are not authorised " })
            }
        } else {
            if (id.authorId == decId) {
                next()
            } else {
                res.status(403).send({ status: false, message: " You are not authorised " })
            }
        }
    }
    catch (err) {
        res.status(400).send({ status: false, message: "Invalid blog id" })
    }
}
module.exports = { authentication, authorisation }