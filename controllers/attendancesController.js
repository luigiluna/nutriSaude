const patientMiddleware = require('../middlewares/Patient');



exports.index = (req, res) => {
    res.render('attendances');

}

exports.action = (req, res) => {
   

    let responseJson = {}
    responseJson.patients = patientMiddleware.painelFilter(req.body);

    responseJson.table = true;

    console.log(responseJson.patients);
    res.render('attendances', responseJson);   
}