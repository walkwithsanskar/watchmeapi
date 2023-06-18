const Post = require("../models/Post");
const User = require("../models/Users")
const uploadToCloudinary = require("../utlis/cloudUpload");

exports.createPost = async(req,res)=>{

    try{

                
    const {caption} = req.body;
    const {user_id} = req.user;

    const postFile = req.files.postFile;

        let  postFileData;
    try{

         postFileData = await uploadToCloudinary(postFile,"postFile",40);
       

    }catch(error){
            console.log("couldnt upload post file ");

            return res.status(500).json({
                success:false,
                message:"cannot upload file on cloud ",
            })
    }

    const post = await Post.create({user_id,caption,postUrl:postFileData.secure_url});

    const user = await User.findByIdAndUpdate({_id:user_id},{$push:{
                                posts:post._id
                            }},{new:true});

    res.status(200).json({
        success:true,
        message:"post created successfully",
        post,
        user
    })



    }catch(error){

        res.status(500).json({
            success:false,
            message:"could not create post "
        })

    }

    
}
exports.getFeedPost = async(req,res)=>{

        try{

            const posts = await Post.find({}).populate({
                            path:"comments",
                            populate:{

                                path:"user_id"

                            }
            }).populate("user_id").populate("likes").exec();

           

            res.status(200).json({
                success:true,
                message:"fetched all post",
                posts : posts.reverse()
            })


        }catch(error){
            res.status(400).json({
                success:false,
                message:"could not fetch all posts"
            })
        }

}

exports.getUserPosts = async(req,res) =>{

    try{

            //grab the user  from params
             const {userid} = req.params;
             const allPosts = await Post.find({user_id:userid}).populate("likes").exec();

             res.status(200).json({
                success:true,
                message: "fetched all user posts",
                allPosts : allPosts.reverse()
             })

    
    



    }catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:"couldn't get user posts"
        })
    }


}