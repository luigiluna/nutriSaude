const patientMiddleware = require('../middlewares/Patient');



exports.index = (req, res) => {
    res.render('add');
}

exports.addAction = (req, res) => {
    
    let data = new Date();
    req.body.date = `${data.getFullYear()}-${data.getMonth()}-${data.getDay()}`;

    patientMiddleware.addPatient(req.body);
    patientMiddleware.addQueue(req.body);

    res.redirect('/');
}
