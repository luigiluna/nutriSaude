const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.getDoctors = async () => {
    let responseJson = []

    let doctors = await User.find({status:'doctor'});

    doctors.forEach((doctor, index) => {
        responseJson.push({name: doctor.firstName, id: doctor._id});
    })
    
    return responseJson;
}

exports.getDoctorName = async (id) => {
    if(id=="false") return 'Livre';
    let data = await User.findOne({_id:id}, {firstName:1});
    return data.firstName;   
}

exports.getDoctorById = async (id) => {
    let data = await User.findOne({_id:id});
    return data;
}

exports.updateUserByEmail = async (user) => {
    await User.updateOne({email:user.email}, user);
    return;
}