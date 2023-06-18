const Like = require("../models/Like");
const Post = require("../models/Post");


exports.createLike = async(req,res) =>{

            try{

                
                            const {postid} = req.params;
                            const {user_id} = req.user;

                            const already = await Like.findOne({post_id:postid , user_id:user_id});

                            if(already){
                                return res.status(400).json({
                                    success:false,
                                    message:"liked already"
                                })
                            }

                            const newLike = await Like.create({post_id:postid,user_id:user_id});

                            const updatedPost = await Post.findByIdAndUpdate({_id:postid},{
                                $push:{ likes : newLike._id}
                            },{new:true});

                            res.status(200).json({
                                success:true,
                                message:"liked success",
                                newLike,
                                updatedPost
                            })

        

            }catch(error){
                res.status(400).json({
                    success:false,
                    message:"could not like the post"
                })
            }


}

exports.removeLike = async(req,res)=>{

    try{

                
        const {postid} = req.params;
        const {user_id} = req.user;

        const newLike = await Like.findOne({post_id:postid , user_id:user_id});
        const removeLike = await Like.findByIdAndDelete({_id:newLike._id});

        const updatedPost = await Post.findByIdAndUpdate({_id:postid},{
            $pull:{ likes : newLike._id}
        },{new:true});

        res.status(200).json({
            success:true,
            message:"unliked success",
            newLike,
            updatedPost
        })



}catch(error){
res.status(400).json({
success:false,
message:"could not unlike the post"
})
}



}