const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        user_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        caption:{
            type:String,
            required:true,
            default:""
        },
        postUrl:{
            type:String,
            required:true
        },
        likes:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Like"
            }
        ],
        comments:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Comment"
            }
        ],
        date:{
            type:Date,
            default: Date.now()
        }
    }
)


module.exports = mongoose.model("Post",postSchema);

