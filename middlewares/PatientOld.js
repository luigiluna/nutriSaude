const patientData = require('../patientData');
const patientQueue = require('../patientQueue');
const fs = require('fs');


exports.getPatients = () => {
    return patientData;
}

exports.getPatientByDate = (date) => {

    let responseJson = [];

    patientData.forEach((patient, index) => {
        if(patient.date == date) {
            responseJson.push(patient);
        }
    })
    return responseJson;
    
}

exports.getPatientById = (id) => {
    let responseJson = {};
    patientData.forEach((patient, index) => {
        if(id == patient.id) {
            responseJson = patient;
        }
    })
    
    return responseJson;
}

exports.addPatient = (patient) =>{
    if(patientData.length > 0) {
        patient.id = patientData.length+1;
    } 
    else {
        patient.id = 1;
    }

    patientData.push(patient);
    savePatients();
    
}

exports.updatePatient = (patient) => {
    patientData.forEach((patientF, index) => {
        if(patient.id == patientF.id) {
            patientF.name = patient.name;
            patientF.telephone = patient.telephone;
            patientF.doctor = patient.doctor;
            patientF.price = patient.price;
            patientF.bioimpedancia = patient.bioimpedancia;
        }
    })

    savePatients();
}

exports.deletePatient = (id) => {
    patientData.forEach((patient, index) => {
        if(id == patient.id) {
            patientData.splice(index,1);
        }
    })
    regenerateId();
    savePatients();
}

exports.painelFilter = (data) => {
    let responseJson=[];
    
   

    if(data.doctor=='false'){
        
        patientData.forEach((patient, index) => {
            let monthYear = `0${patient.date.split('-')[1]}-${patient.date.split('-')[0]}`
            
            if(monthYear == data.date){
                responseJson.push(patient);
            }
        });
        return responseJson;
    } 
    else {
        patientData.forEach((patient, index) => {
            let monthYear = `0${patient.date.split('-')[1]}-${patient.date.split('-')[0]}`
            if(monthYear == data.date && data.doctor.localeCompare(patient.doctor) == 0){
                responseJson.push(patient);
            }
        });
        return responseJson;        
    }

}

exports.getQueue = () => {
    
    return patientQueue;
}

exports.addQueue = (patient) => {
    if(patientQueue.length > 0) {
        patient.id = patientQueue.length+1;
    } 
    else {
        patient.id = 1;
    }
    patientQueue.push(patient);
    saveQueue();
}

exports.updateQueue= (patient) => {
    patientQueue.forEach((patientF, index) => {
        if(patient.id == patientF.id) {
            patientF.name = patient.name;
            patientF.telephone = patient.telephone;
            patientF.doctor = patient.doctor;
            patientF.price = patient.price;
            patientF.bioimpedancia = patient.bioimpedancia;
        }
    })

    saveQueue();
}
exports.deleteQueue = (id) => { 

    patientQueue.forEach((patient, index) => {
        if(id == patient.id) {
            patientQueue.splice(index,1);
        }
    })
    saveQueue();
}

exports.clearQueue = () => {
    patientQueue = [];
    saveQueue();
}

exports.regenerateId = () => {
    patientData.forEach((patient, index) => {
        patient.id = index + 1;
    })

    savePatients();
}


function savePatients(){

    fs.writeFile('./patientData.js', 
    `module.exports = ${JSON.stringify(patientData)}`,{flag: 'w'}, function (err) {
        if (err) throw err;
       
    });

}


function saveQueue(){

    fs.writeFile('./patientQueue.js', 
    `module.exports = ${JSON.stringify(patientQueue)}`,{flag: 'w'}, function (err) {
        if (err) throw err;

    });

}