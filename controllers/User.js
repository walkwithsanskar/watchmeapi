const User = require("../models/Users");

exports.getUserData=async(req,res)=>{

    try{

    //get userId 
    const {user_id} = req.user;
   
    //get all data about user from  user id obtained 

    const user = await User.findById({_id:user_id}).populate({
        path:"posts",
        populate:{
            path:"comments"
        }
    });
    

    if(!user){
        return res.status(400).json({
            success:false,
            message:"user doesnt exist"
        })
    }
    
    res.status(200).json({
        success:true,
        user,
        message: "fetched user"
    })
    



    }catch(error){

        res.status(400).json({
            success:false,
            message:"can not fetch user "
        })

    }


}

exports.getUserById = async(req,res) =>{

    try{

        const {friendid} = req.params;
        const user = await User.findById({_id:friendid}).populate({
            path:"posts",
            populate:[
                {   
                path:"comments",
                populate:{
                    path:"user_id"
                }
            },

                {
                path:"likes"
            },
            {path:"user_id"}
        ]
        }).populate("friends").exec();
        res.status(200).json({
            success:true,
            message:"got friend by id",
            user,
            userFriends:user?.friends
        })

    }catch(error){
        console.log("can not get user by id");
        res.status(500).json({
            success:false,
            message:"couldnot fetch friends by id "
        })
    }

}

exports.getUserFriends= async(req,res)=>{


    try{

        //get userId 
        const {user_id} = req.user;
        //get all data about user from  user id obtained 
    
        const user = await User.findById({_id:user_id});
   
    
        if(!user){
            return res.status(400).json({
                success:false,
                message:"user doesnt exist"
            })
        }
        
        res.status(200).json({
            success:true,
            userFriends:user.friends,
            message: "fetched all friends of user"
        })
        
    
    
    
        }catch(error){
    
            res.status(400).json({
                success:false,
                message:"can not fetch user freinds "
            })
    
        }
    


}


exports.removeFriend = async(req,res) =>{

        try{
            const {friend} = req.params;
        const {user_id} = req.user;

        const user = await User.findByIdAndUpdate({_id:user_id},{
            $pull:{friends:friend}
        },{new:true});

        res.status(200).json({
            success:true,
            message:"friend removed successfully",
            user
        })
        }catch(error){
            res.status(400).json({
                success:false,
                message:"friend could n't be removed"
            })
        }

}

exports.addFriend = async(req,res) =>{

                
        try{
            const {friend} = req.params;
            const {user_id} = req.user;

            const ans = await User.findOne({_id:user_id , friends:friend}).exec();

            if(ans){
                return res.status(400).json({
                    success:false,
                    message:"friend is already added"
                });
            }
            const user = await User.findByIdAndUpdate({_id:user_id},{
                $push:{friends:friend}
            },{new:true});

        
        // const 

        res.status(200).json({
            success:true,
            message:"friend added successfully",
            user
        })
        }catch(error){
            res.status(400).json({
                success:false,
                message:"friend could n't be added"
            })
        }

}