const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true,
            default:""
        },
        email:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true
        },
        profilePic:{
            type:String,
            default:""
        },
        friends:[{
            type:mongoose.Schema.Types.ObjectId,
            ref: "User"

        }
        ],
        
       
        posts:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Post"
            }
        ]


    }
)


module.exports = mongoose.model("User", userSchema);