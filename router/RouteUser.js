const express=require('express')
const router=express.Router()
const User=require('../User')
const bcrypt =require('bcrypt')
const joi=require('joi')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const app = express()
dotenv.config()
const schema=joi.object({
    email:joi.string().email().required(),
    password:joi.string().min(7).required(),
    isAdmin:joi.boolean()
})
// register user
router.post('/register', async (req, res) => {
    const jwt=process.env.JWT_KEY
    const {error}=schema.validate(req.body)
    if(error)
    {
       return  res.status(400).json({message:error.details[0].message})
    }
 let {email,password,isAdmin}=req.body
 if(email && password){
    checkuser=await User.findOne({email})
    if(checkuser){
        res.status(400).json({message:'email deja existe'})
    }
    else{
        password=await bcrypt.hash(password,10)
        user=new User({email,password,isAdmin})
       usersave=await user.save()
       res.status(201).json({message:'Bien enregister',data:usersave})
    }
 }
 else{
    res.status(400).json({message:'email et mot de passe sont obligatoire'})
 }




})

// detete user
router.delete('/:email',async(req,res)=>{
    const email=req.params.email
    checkuser=await User.findOne({email})
    if(checkuser){
        checkuser.isActived=false
        userupadte=await User.findOneAndUpdate({email},checkuser,{new:true})
        res.status(200).json({message:'utilisateur est supprimé',data:userupadte})
    }
    else{
        res.status(404).json({message:'utilisateur n\'existe pas'})
    }
})
// gest user isactived
router.get('/actived',async(req,res)=>{
    checkuser=await User.find({isActived:true},{email:1,isAdmin:1,_id:0})
    checkuser? res.status(200).json({data:checkuser}) 
     :res.status(404).json({message:'NOT FOUND'})
})
// update user
router.put('/:email/edit',async(req,res)=>{
    const email=req.params.email
    const {password,isAdmin}=req.body
    if(email && password){
        checkuser=await User.findOne({email})
        if(checkuser){
            hash=await bcrypt.hash(password,10)
console.log(checkuser.password)
            checkuser.password=hash
            checkuser.isAdmin=isAdmin
             userUpdate=await User.findOneAndUpdate({email},checkuser,{new:true})
             res.status(200).json({message:'utilisateur est modifié',data:userUpdate})
        }
       
    }
    else{
        res.status(400).json({message:"champs sont obligatoire"})
    }

})
//login user
router.post('/login',async(req,res)=>{
    let {email,password}=req.body
    if(email && password){
        checkuser=await User.findOne({email})
        if(checkuser)
        {
         if(await bcrypt.compare(password,checkuser.password)) 
           {
            res.status(200).json({message:'connecter'})
           }
           else{
            res.status(400).json({message:'email ou mot de passe invalide'})
           }
        }
        else
        {
            res.status(400).json({message:'email ou mot de passe invalide'})
        }
    }
    else{
        res.status(400).json({message:"champs sont obligatoire"})
    }
})
module.exports=router