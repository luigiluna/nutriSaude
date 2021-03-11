const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        trim:true,
        required:'Email obrigatorio'
    },
    firstName:String,
    lastName:String,
    status: { type:String, default:'doctor'}


});

userSchema.plugin(passportLocalMongoose, {usernameField:'email'});

module.exports = mongoose.model('User', userSchema);