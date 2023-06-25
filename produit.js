const mongoose = require('mongoose')
/**
 * {
    "code":111,
    "name": "p1",
    "category":"hp",
    "prix":100000
    }
 */
const produit = mongoose.model('Produit', {
    code: {
        type: Number,
        required:true
    },
    name: {
        type: String
    },
    category: {
        type: String,
        enum:['hp','lenovo','apple']
    },
    prix: {
        type: Number,
        min:0
    }
})
module.exports=produit