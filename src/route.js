const express= require('express')
const authorController=require('../controller/authorController')
const blogController=require('../controller/blogController')
const router=express.Router()
router.get('/test', function(req,res){
    res.send("hello genius")
})
router.post('/authors',authorController.createAuthor)//himanshu jha
router.post('/blogs', blogController.createBlog)//rishikesh khare
// router.get('/authors',authorController.getAuthor)//gaurav pandey
router.get('/blogs',blogController.getBlogs)//umme habeeba ansari
// router.put('/authors',authorController.updateAuthor)
// router.delete('/authors',authorController.deleteAuthor)
router.put('/blogs/:blogId',blogController.updateBlog)
router.delete('/delteBlog/:id',blogController.delteBlog)
router.delete('/deleteByQuery',blogController.deleteByQuery)
module.exports=router