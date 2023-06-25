// import mongoose
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/api1')
    .then(() => console.log('connected'))
    .catch(error => console.log(error))

