const mongoose = require('mongoose');
/**
 *    {
       "code":1100000,
    "nom": "ghj",
    "prenom": "sa",
    "date_naissance": "2002-10-17",
    "sexe":"F",
    "image":"gkj",
    "classe": "gj"
    }
 */
const Students = mongoose.model('Students', {
    code: {
        unique:true,
        type: Number,
        min:1000000,
        max:9999999
    },
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    date_naissance: {
        type: Date
    },
    sexe:{
        type:String,
        enum:['F','M']
    },
    image:{
        type:String
    },
    classe: {
        type: String,
        default: "DSI"
    }
})

module.exports = Students;