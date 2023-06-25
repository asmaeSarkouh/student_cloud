const express = require('express')
const router = express.Router()
const Utilisateur = require('../utilisateur')
const bcrypt = require('bcrypt')
const joi = require('joi')

const schema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
    isAdmin:joi.boolean()
})
//create utilisateur
router.post('/add', async (req, res) => {
    const { err } = schema.validate(req.body)
    if (err) {
        return res.status(400).json({message:err.datails[0].message})
    }
    let { name, email, password, isAdmin } = req.body
    if (name && email && password) {
        check_utilisateur = await Utilisateur.findOne({ email })
        if (check_utilisateur) {
            res.status(400).json({message:'email deja existe'})
        }
        else {
            password = await bcrypt.hash(password, 10)
            utilisateur = new Utilisateur({ name, email, password, isAdmin })
            usersave=await utilisateur.save()
            res.status(201).json({message:'bien enregister',data:usersave})
        }
    }
    else {
        res.status(400).json({message:'email et mot de passe sont obligatoire'})
    }
})

//delete utilisateur
router.delete('/:email', async (req, res) => {
    const email = req.params.email
    check_utilisateur = await Utilisateur.findOne({ email })
    if (check_utilisateur) {
        check_utilisateur.isActive = false
        utilisateurUpdate = await Utilisateur.findOneAndDelete({ email }, check_utilisateur, { new: true })
        res.status(200).json({ message: 'utilisateur est supprime',data:utilisateurUpdate})
    }
    else {
        res.status(404).json({message:'utilisateur n\'existe pas'})
    }
})

//utilisateur active
router.get('/', async (req, res) => {
    check_utilisateur = await Utilisateur.find({}, { name: 1, email: 1, password: 1, isAdmin: 1, _id: 0 })
    check_utilisateur?res.status(200).json({data:check_utilisateur})
    :res.status(404).json({message:'not found'})
})

//edit utilisateur
router.put('/:email/edit', async (req, res) => {
    const email = req.params.email
    const { name, password, isAdmin } = req.body
    if (name && email && password) {
        check_utilisateur = await Utilisateur.findOne({ email })
        if (check_utilisateur) {
            hash = await bcrypt.hash(password, 10)
            check_utilisateur.password = hash
            check_utilisateur.isAdmin = isAdmin
            check_utilisateur.name=name
            utilisateurUpdate = await Utilisateur.findOneAndUpdate({ email }, check_utilisateur,{new:true})
            res.status(200).json({message:'utilisateur est modifie',data:utilisateurUpdate})
        }
    }
    else {
        res.status(400).json({message:'champs sont obligatiore'})
    }
})

//login utilisateur
router.post('/login', async (req, res) => {
    let { email, password } = req.body
    if (email && password) {
        check_utilisateur = await Utilisateur.findOne({ email })
        if (check_utilisateur) {
            if (await bcrypt.compare(password, check_utilisateur.password)) {
                res.status(200).json({message:'connected'})
            }
            else {
                res.status(400).json({message:'email ou mot de passe invalide'})
            }
        }
        else {
            res.status(400).json({message:'email ou mot de passe invalide'})
        }
    }
    else {
            res.status(400).json({message:'champ sont obligatoire'})
        }
})
module.exports=router