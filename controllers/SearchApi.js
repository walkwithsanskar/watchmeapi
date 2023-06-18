const User = require('../models/Users');


exports.searchByEmail = async (req,res) =>{

    try{

        const {email} = req.params;        
       
        const findByEmail = await User.find({email:{$regex:`^${email}`,$options:'i'}});

    

            return res.status(200).json({
                        success:true,
                        message:"users fetched by input search on email basis",
                        users:findByEmail
            })
      





    }catch(error){
        res.status(500).json({
            success:false,
            message:"couldn't find user "
        })
    }
} 