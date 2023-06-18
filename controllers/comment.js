const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/Users")


exports.createComment= async(req,res) =>{

            try{

                const {postid} = req.params;
             
                const {user_id} = req.user;
                const {comment} = req.body;
                
                const newcomment = await Comment.create({comment,post_id:postid,user_id});
                
                const updatedpost = await Post.findByIdAndUpdate({_id:postid},{
                    $push:{
                        comments:newcomment._id
                    }
                }, {new:true}).populate("comments");

                res.status(200).json({
                    success:true,
                    message:"comment created",
                    newcomment,
                    updatedpost,
                    
                })


            }catch(error){
                res.status(400).json({
                    success:false,
                    message:"can not comment on post"
                })
            }



            


}

