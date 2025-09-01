const mongoose=require("mongoose")
//define schema
const songSchema= new mongoose.Schema({
    title:{type:String,required:true,unique:true},
    artist:{type:String,required:true},
    album:{type:String,required:true},
    fileUrl:{type:String,required:true},
    coverImage:{type:String,required:true} }

);
//create model
const Song =mongoose.model("Song",songSchema)
//export model
module.exports=Song
