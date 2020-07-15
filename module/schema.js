const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId=Schema.ObjectId;

const staff_schema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    
    password:{
        type:String,
        required:true
    },
    category:{
        type:Number,
        required:true
    }},{
    versionKey: false 
    
});
var staffs=mongoose.model('staff',staff_schema);
module.exports =staffs;