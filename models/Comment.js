const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    post_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

})

module.exports = mongoose.model("Comment",commentSchema);