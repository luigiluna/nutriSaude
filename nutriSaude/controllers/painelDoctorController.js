const patientMiddleware = require('../middlewares/Patient');



exports.index = (req, res) => {
    res.render('painelDoctor');
}

exports.action = (req, res) => {
    let responseJson = {}

    if(req.body.month == undefined || req.body.month == null || req.body.month == ' '){
        res.redirect('/painelDoctor');  
    }
    
    responseJson.patients = patientMiddleware.painelFilter(req.body);
    
    responseJson.value = 0;

    responseJson.tam = responseJson.patients.length;

    responseJson.doctor = responseJson.patients[0].doctor;

    
    responseJson.patients.forEach((patient, index) => {
        responseJson.value += patient.price;
        
    });

    console.log(responseJson.value);
    responseJson.table = true;

    
    res.render('painelDoctor', responseJson);   
}