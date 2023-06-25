const mongoose = require('mongoose');
/**
 *    {
    "email": "ass@gmail.com",
    "password": "12345678",
    "isAdmin":true
    }
 */
const Users = mongoose.Schema( {

    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isActived:{
        type:Boolean,
        default:true
    }
},{timestamps:true})

module.exports =mongoose.model('User',Users);