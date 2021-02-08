const patientMiddleware = require('../middlewares/Patient');



exports.index = (req, res) => {
    let patients = patientMiddleware.getQueue();
    res.render('home', {patients});

}

exports.deleteQueueAction = (req, res) => {
    patientMiddleware.deleteQueue(req.params.id);
    res.redirect('/');
}

