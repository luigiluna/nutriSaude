const patientMiddleware = require('../middlewares/Patient');



exports.index = (req, res) => {
    res.render('painelDoctor');
}

exports.action = (req, res) => {
    let responseJson = {}

    
    
    responseJson.patients = patientMiddleware.painelFilter(req.body);
    
    responseJson.value = 0;

    responseJson.tam = responseJson.patients.length;

    

    
    responseJson.patients.forEach((patient, index) => {
        responseJson.value += patient.price;
        if(index==0){
            responseJson.doctor = responseJson.patients[0].doctor;
        }
        
    });

    console.log(responseJson.patients);
    responseJson.table = true;

    
    res.render('painelDoctor', responseJson);   
}