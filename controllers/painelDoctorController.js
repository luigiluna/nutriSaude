const patientMiddleware = require('../middlewares/PatientMiddleware');
const userMiddleware = require('../middlewares/UserMiddleware');
const configMiddleware = require('../middlewares/ConfigMiddleware');

exports.index = async (req, res) => {

    if(req.user.status == 'admin'){
        res.render('painelDoctorAdmin');
    }

    else if(req.user.status == 'doctor') {
        let responseJson = {};

        let data = new Date();

        let params = {
            date: `${data.getFullYear()}-${data.getMonth()+1}`,
            doctorKey: req.user._id
        }

        let settings = await configMiddleware.getAll();

        responseJson.patients = await patientMiddleware.painelFilter(params.doctorKey, params.date);
        responseJson.value = 0;
        responseJson.tam = responseJson.patients.length;
        responseJson.table = true;
        
        
        settings.transferValueSport = parseInt(settings.transferValueSport);
        settings.transferValue = parseInt(settings.transferValue);
        
        

        responseJson.patients.forEach((patient, index) => {
            if(patient.sport == true){
                responseJson.value += settings.transferValueSport;
            } 

            else {
                responseJson.value += settings.transferValue;
            }
            
        });

        responseJson.doctor = req.user.firstName;
        res.render('painelDoctor', responseJson);

    }
    else{
        res.render('404');
    }


    
    
}

exports.action = async (req, res) => {
    let responseJson = {}
  
    responseJson.patients = await patientMiddleware.painelFilter(req.user._id, req.body.date);

    responseJson.value = 0;
    responseJson.tam = responseJson.patients.length;

    let settings = await configMiddleware.getAll();
    
    settings.transferValueSport = parseInt(settings.transferValueSport);
    settings.transferValue = parseInt(settings.transferValue);
    
    

    responseJson.patients.forEach((patient, index) => {
        if(patient.sport == true){
            responseJson.value += settings.transferValueSport;
        } 

        else {
            responseJson.value += settings.transferValue;
        }
        
    });

    responseJson.table = true;
    responseJson.doctor = req.user.firstName;

    
    res.render('painelDoctor', responseJson);   
}

exports.actionAdmin = async (req, res) => {
    let responseJson = {}
    let settings = configMiddleware.getAll();
    settings.transferValue = parseInt(settings.transferValue);

  
    responseJson.patients = await patientMiddleware.painelFilter(req.body.doctorKey, req.body.date);

    responseJson.value = 0;
    responseJson.tam = responseJson.patients.length;
    
    responseJson.patients.forEach((patient, index) => {
        responseJson.value += settings.transferValue;
        
    });

    responseJson.table = true;
    responseJson.doctor = await userMiddleware.getDoctorName(req.body.doctorKey);

    
    res.render('painelDoctorAdmin', responseJson);   
    
}