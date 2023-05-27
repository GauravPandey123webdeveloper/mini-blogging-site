const express = require('express')
const authorController = require('../controller/authorController')
const blogController = require('../controller/blogController')
const { verifyToken, authorityToCreate, protectedApi } = require('../middleware/authentication');
const router = express.Router()
router.get('/test', function (req, res) {
    res.send("hello genius")
})
router.post('/authors', authorController.createAuthor)
router.post('/blogs', verifyToken, authorityToCreate, blogController.createBlog)
router.post('/userLogin', authorController.userLogin)
router.get('/blogs', verifyToken, blogController.getBlogs)
router.put('/blogs/:blogId', verifyToken, protectedApi, blogController.updateBlog)
router.delete('/blogs/:blogId', verifyToken, protectedApi, blogController.deleteBlog)
router.delete('/deleteByQuery', verifyToken, blogController.deleteByQuery)
module.exports = router;