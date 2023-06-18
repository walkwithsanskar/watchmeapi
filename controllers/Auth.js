const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const uploadToCloudinary = require("../utlis/cloudUpload");
require("dotenv").config();
exports.signUp = async(req,res)=>{


    try{
    
    
    const {firstName,lastName,email,password} = req.body;
    
    const profilePic = req.files.profilePic;
 

    const existinguser = await User.findOne({ email:email });
  

    if(existinguser){

        return  res.status(200).json({
            success:false,
            message:"user already exists"

        })
    }
 
    let  profilePicData;
    try{
       
         profilePicData = await uploadToCloudinary(profilePic,"pofilePics",80);
         


    }catch(error){
            console.log("couldnt upload profile pic");

             res.status(500).json({
                success:false,
                message:"cannot upload file on cloud ",
            })
    }
   
    //will apply validations latter assuming all data has reached server
    //hash the password
    let hashedPassword ;

    try{

        hashedPassword = await bcrypt.hash(password,10);

    }catch(error){

        return res.status(500).json({
            success:false,
            message:"unable to hash password try again latter"
        })

    }

    //create entry in db
    const user = await User.create({firstName,lastName,email,password:hashedPassword,profilePic:profilePicData.secure_url});
    
    return res.status(200).json({
        success:true,
        message:"user created successfully ",
        data:user
    })


    }catch(error){

        res.status(500).json({
            success:false,
            message:"failed to register user"
        })
    }





}

exports.logIn = async(req,res) =>{

    try{

        //fetch data from body

        const {email,password} = req.body;
        
        //fetch user details 

        let user = await User.findOne({email}).populate("friends").exec();
        // console.log(user);
        

        if(user){

            try{
                
                if( await bcrypt.compare(password,user.password)){

                    //generate token ans send token 
                   
                    const payload = {
                        
                        user_id:user._id,
                        email:user.email,

                    

                    }

                   
                    const token = await jwt.sign(payload,process.env.JWT_SECRET,{
                        expiresIn:"24h"
                    });

                    return res.status(200).json({
                        success:true,
                        message:"successful login",
                        token,
                        user
                        
                    })

                }else{
                    return res.status(200).json({
                        success:false,
                        message:"password incorrect"
                    })

                }
            }catch(error){
                return res.status(500).json({
                    success:false,
                    message:"password incorrect"
                })
            }


        }else{
            return res.status(200).json({
                success:false,
                message:"please sign up kro chachaa"
            })
        }
        




    }catch(error){

        res.status(500).json({
            success:false,
            message:"unable to login at the moment"
        })
    }
}