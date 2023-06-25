const express = require('express')
const app = express.Router()
const Produit = require('../produit')
//-------CRUD--------

//*CREATE
app.post("/add", async (req, res) => {
   try {
        const data = req.body
        const db = new Produit(data)
        const saved = await db.save()
        res.status(201).json({message:"produit created",data:saved})
    }
    catch (err) {
        res.status(400).json({Error:message.err})
    }
});

//READ
app.get('/', async (req, res) => {
    try {
        const produits = await Produit.find()
        res.status(200).send(produits)
    }
    catch (err) {
        res.status(400).json({Error:message.err})
    }
})

//DETAIL
app.get('/:code', async (req, res) => {
    try {
        const produits = await Produit.findOne({ code: req.params.code })
        produits ?
            res.status(200).json({ produits })
            :res.status(404).json({Error:"not foutd"})
    }
    catch (err) {
        res.status(400).json({Error:message.err})
    }
})

//Update
app.put('/:code/edit',async(req,res)=>{
    try{
        const produit = await Produit.findOneAndUpdate({ code: req.params.code }, req.body)
        produit ? res.status(200).json({ message: "updated", produit :req.body})
            :res.status(404).json({Error:"not found"})
    }
    catch (err) {
        res.status(400).json({Error:message.err})
    }
})

//Delete
app.delete('/:code', async (req, res) => {
    try {
        const produit = await Produit.findOneAndDelete({ code: req.params.code })
        produit ? res.status(200).json({ message: "deleted" })
            :res.status(404).json({Error:'not found'})
    }
     catch (err) {
        res.status(400).json({Error:message.err})
    }
})
module.exports=app