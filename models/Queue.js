const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const QueueSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:'Nome obrigatorio'
    },
    telephone: Number,

    doctorKey:String,
    
    price: Number,
    bioimpedancia:{ type: Boolean, default: false },
    date:String
   

});

module.exports = mongoose.model('Queue', QueueSchema);