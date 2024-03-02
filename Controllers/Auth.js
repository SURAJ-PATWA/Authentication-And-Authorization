const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require("jsonwebtoken");
require('dotenv').config();


// Sign up route handler
exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists',
            });
        }
        
        // Secure password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create  entry for user
        const user = await User.create({ name, email, password: hashedPassword, role });
        
        // Successful response
        return res.status(200).json({
            success: true,
            message: 'User created successfully',
            user: user, // Optionally, you can include the user data in the response
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'User cannot be registered, please try again later',
        });
    }
};

//Login

exports.login = async(req,res)=>{
    try {

        const {email,password}=req.body;
        // validation of password or email
        // if email or password are email   

        if(!email || !password){   // email or pass not  writ 
       return  res.status(400).json({
        success:false,
        message:"Please fill all the details carefully",
       })
        }

        // check for register user

        let user =await User.findOne({email});  //fetch data from db
        if(!user)// not match  email in db
        {
            return res.status(401).json({
                success:false,
                message : "User does not exist",            });



        }
        // here we define a payload => payload is a extra data which u want to use 
                        const payload={
                            email:user.email,
                            id:user._id,
                            role:user.role,
                        }

        // if match email i will move to password 
         // Verify password & generate a JWT token
         // check password we use bcrypt.compare(current password , db password)
         if(await bcrypt.compare(password,user.password)){  // compare both password 
            //password match  if password match we create a token 
            let token =  jwt.sign (payload , process.env.JWT_SECRET,{
                           expiresIn:"2h",
            });// creating a token we follow jwt.sign method  that take 3 argument (payload,securekey,option)
          
            //  after creting a token we store in scema
            user=user.toObject();  // no need it user is alread a obj
            user.token =token // add a new property in schema add a new obj
            user.password=undefined;  // we hide password not in real db only for view concept

            // tokem ke baad we create a cookie =>return cookie =>  it take also3 parameter (cookies_name , cookies_data ,options)
             
             // we create a option for cookie
             const options={
                expires:new Date(Date.now()+ 3*24*60*60*1000),  // expire 3 din 
                httponly:true, // only access for server side not access for clint side
             }
            res.cookie("Patwa_Cokkie",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"User logged in Successfully"
            });
         }
         else{
            //password not match
            return res.status(403).json({
                success:false,
                message:"Password does not match",
            
            })
         }

         



        
    } 
    catch (error) {
       console.error(err);
       return res.status(500).json({
        success:false,
        message:"Login false"
       })

    }
}
