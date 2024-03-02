const jwt =require('jsonwebtoken');
require('dotenv').config();

exports.auth=(req,res,next)=>{

    try {
        const token = req.body.token;
        //const token = req.cookie.token          yaha se bhi le sakte ho 

        if(!token){   // if token is empty
            return res.status(401).json({
                sucess:false,
                message:'token missing'
            })
        }

        // verify the token
        try {

            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);  // return plain text  email id role

            req.user=decode;  // ye kaam aega stuent aur Admin ko match karne ke lea
            
        } catch (e) {
            return res.status(401).json({
                success: false,
                message: "token is invalid"
            })
        }
        next();

        


   } catch (err) {
        console.log(err)
        return res.status(401).json({
            success: false,
            message: "Something went wrong while verifying token"
        })
    }

}

exports.isStudent=(req,res,next)=>{
    try {
        
       if(req.user.role!=='Student'){
        return res.status(401).json({
            success: false,
            message: "This is a protect route for students you can not access it"
        })
    }
    next();
       }


       catch (err) {
        return res.status(500).json({
            success: false,
            message: "User Role is not Matching"
        })
    }
}



exports.isAdmin=(req,res,next)=>{
    try {
        
       if(req.user.role!=='Admin'){
        return res.status(401).json({
            success: false,
            message: "This is a protect route for students you can not access it"
        })
    }
    next();
       }


       catch (err) {
        return res.status(500).json({
            success: false,
            message: "User Role is not Matching"
        })
    }
}


