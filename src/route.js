<<<<<<< HEAD
// importing the express package for creating server and router
const express= require('express')
//importing authercontroller
const authorController=require('../controller/authorController')
//importing blogcontroller
const blogController=require('../controller/blogController')
//importing middlewares
const {authentication, authorisation}= require('../middleware/authentication')
const router=express.Router()
router.get('/test', function(req,res){
    res.send("hello ")
})
//creating author 
router.post('/authors',authorController.createAuthor)
//creating blogs
router.post('/blogs',authentication, blogController.createBlog)
//getting authors 
router.get('/authors',authentication,authorController.getAuthor)
//login 
router.post('/login',authorController.userLogin)
//getting blogs
router.get('/blogs',authentication,blogController.getBlog)
//updating blogs 
router.put('/blogs/:blogId',authentication, authorisation,blogController.updateBlog)
//deleting blogs by path params
router.delete('/blogs/:blogId',authentication, authorisation,blogController.deleteBlogByParam)
//deleting blogs by query params
router.delete('/blogs',authentication, authorisation,blogController.deleteBlogByQuery)

=======
// importing the express package for creating server and router
const express= require('express')
//importing authercontroller
const authorController=require('../controller/authorController')
//importing blogcontroller
const blogController=require('../controller/blogController')
//importing middlewares
const {authentication, authorisation}= require('../middleware/authentication')
const router=express.Router()
//creating author 
router.post('/authors',authorController.createAuthor)
//creating blogs
router.post('/blogs',authentication, blogController.createBlog)
//getting authors 
router.get('/authors',authentication,authorController.getAuthor)
//login 
router.post('/login',authorController.userLogin)
//getting blogs
router.get('/blogs',authentication,blogController.getBlog)
//updating blogs 
router.put('/blogs/:blogId',authentication, authorisation,blogController.updateBlog)
//deleting blogs by path params
router.delete('/blogs/:blogId',authentication, authorisation,blogController.deleteBlogByParam)
//deleting blogs by query params
router.delete('/blogs',authentication, authorisation,blogController.deleteBlogByQuery)

>>>>>>> 09107f12193f999f7b66b1417d080d1f4ee31e90
module.exports=router