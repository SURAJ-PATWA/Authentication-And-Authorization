const express= require('express');
const router = express.Router();

const{login , signup}= require('../Controllers/Auth');
const {auth,isAdmin,isStudent}=require('../middleware/auth');

router.post('/login',login);  // for login
router.post('/signup',signup);  // for router


// Testing Route for Middleware
router.get('/test',auth,(req,res)=>{
    res.json({
      success:true,
      message:"Test successful"  
    })
}) 

//Protected Route for student
router.get('/student',auth,isStudent,(req,res)=>{
    res.json({
        sucess:true,
        message:"Welcome to Protected Route for student"
    })
});

//Protected Route for Admin
router.get('/admin',auth,isAdmin,(req,res)=>{
    res.json({
        sucess:true,
        message:"Welcome to Protected Route for Admin"
    })
});

module.exports=router;