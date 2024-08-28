const mongoose = require('mongoose');

const LivreSchema= mongoose.Schema({
    titre: {
        type: String, required: true
    },
    Autheur: {
        type: String, required: true
    },
    DatePublication:{
        type:Number, required:true
    },
    genre:{
        type:String
    }
    

})

module.exports = mongoose.model('Livre', LivreSchema);