const patientMiddleware = require('../middlewares/PatientMiddleware');
const queueMiddleware = require('../middlewares/QueueMiddleware');


exports.index = (req, res) => {
    res.render('add');
}
 //nao utilizando
exports.addAction = async (req, res) => {
    
    let data = new Date();
    req.body.date = `${data.getFullYear()}-${data.getMonth()+1}-${data.getDay()}`;
    
    let id = await patientMiddleware.addPatient(req.body);
    await queueMiddleware.addQueue(req.body, id);
    
    

    res.redirect('/');
}
