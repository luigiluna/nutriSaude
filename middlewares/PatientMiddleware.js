const mongoose = require('mongoose');
const Patient = mongoose.model('Patient');
const userMiddleware = require('./UserMiddleware');

exports.getPatients = async () => {
    const data = await Patient.find();
    return data;

}

exports.getPatientByDate = async (date) => {
    const data = await Patient.find({date: date});
    return data;
    
}

exports.getPatientById = async (id) => {
    const data = await Patient.findOne({_id: id});
    return data;
    
}

exports.addPatient = async (patient) =>{
    patient.name = await capitalize(patient.name.toLowerCase());
    const data = new Patient(patient);
    await data.save();
    return data._id;
}

exports.updatePatient = async (patient) => {
    await Patient.updateOne({_id: patient.id}, patient);
}

exports.getPatientByName = async (name) => {
    let responseJson = [];

    const data = await Patient.find({name: new RegExp(name)});

    const promises = data.map (async (item,index) => {
            item.doctorName = await userMiddleware.getDoctorName(item.doctorKey);
            responseJson.push(item);
    });

    await Promise.all(promises);
    return responseJson;
    
}


//Funcção que cuida de buscar os dados para o painel e attendences
//Filtra por data e medico ou so por data

exports.painelFilter = async (doctorKey, date) => {
    let responseJson = []

    //Filtro so por data
    if(doctorKey=='false'){
        var data = await Patient.find({date: new RegExp(date)});
       
    }
    //Filtro por data e medico atendido
    else {
        var data = await Patient.find({date: new RegExp(date), doctorKey: doctorKey});
    }

    if(date.split('-').length == 3){
        const promises = data.map (async (item,index) => {

            if((item.date.split('-')[1] == date.split('-')[1]) && (item.date.split('-')[2] == date.split('-')[2])){
                item.doctorName = await userMiddleware.getDoctorName(item.doctorKey);
                responseJson.push(item);
            }
            
        });
        
        await Promise.all(promises);

    }
    else if(date.split('-').length == 2){
        const promises = data.map (async (item,index) => {

            if((item.date.split('-')[1] == date.split('-')[1])){
                item.doctorName = await userMiddleware.getDoctorName(item.doctorKey);
                responseJson.push(item);
            }
            
        });
        
        await Promise.all(promises);

    }

        
        
        return responseJson;
    
}

exports.getPatientByTelephone = async (telephone) => {
    const data = await Patient.find({telephone:new RegExp(telephone)});
    return data;
}

exports.deletePatient = async (id) => {
    await Patient.deleteOne({_id: id});
}



async function capitalize(string) {
    return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}