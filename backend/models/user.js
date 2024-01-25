const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
   email:{ type: String, required: true },
   password : { type: String, required: true },
   role: {type : String , enum:["Admin","User"] , default:"User"},
   isLoggedIn: { type: Boolean, default: false },
   wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'movie' }] 

},{
    versionKey:false
})

const UserModel = mongoose.model("user" , userSchema)

module.exports={UserModel}