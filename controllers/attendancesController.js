const patientMiddleware = require('../middlewares/Patient');



exports.index = (req, res) => {
    res.render('attendances');

}

exports.action = (req, res) => {
    if(req.body.month == undefined || req.body.month == null || req.body.month == ' '){
        res.redirect('/attendances');  
    }

    let responseJson = {}
    responseJson.patients = patientMiddleware.painelFilter(req.body);

    responseJson.table = true;
    res.render('attendances', responseJson);   
}