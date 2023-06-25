const mongoose = require('mongoose')
const utilisateur = mongoose.model('Utilisateur', {
    name: {
        type: String,
        require:true
    },
    email: {
        type: String,
        require:true
    },
    password: {
        type: String,
        require: true
    },
    isAdmin:{
        type: Boolean,
        default:false
    },
    isActive: {
        type: Boolean,
        default:false
    }
})
module.exports=utilisateur