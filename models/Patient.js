const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const patientSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:'Nome obrigatorio'
    },
    telephone: String,


    price: Number,
    sport:{ type: Boolean, default: false },
    date:String,
    
    doctorKey:String

});

module.exports = mongoose.model('Patient', patientSchema);