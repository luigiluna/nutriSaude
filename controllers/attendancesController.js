const patientMiddleware = require('../middlewares/PatientMiddleware');
const userMiddleware = require('../middlewares/UserMiddleware');




exports.index = (req, res) => {
    res.render('attendances');

}

//Ao pesquisar na pagina de attendances
exports.action = async (req, res) => {
    let responseJson = {}
    if(req.body.day != '-'){
        req.body.date = `${req.body.date}-${req.body.day}` 
    }
    responseJson.patients = await patientMiddleware.painelFilter(req.body.doctorKey, req.body.date);
    responseJson.table = true;
    res.render('attendances', responseJson);   
}

exports.onePatient = async (req, res) => {
    let responseJson = {};

    if(!isNaN(parseFloat(req.body.query))){
        console.log(req.body.query);
        responseJson.patients = await patientMiddleware.getPatientByTelephone(req.body.query);
    } 
    else{
        req.body.query = await capitalize(req.body.query);
        responseJson.patients = await patientMiddleware.getPatientByName(req.body.query);
    }

    responseJson.table = true;
    res.render('attendances', responseJson);   
}


async function capitalize(string) {
    return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}