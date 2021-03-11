const patientMiddleware = require('../middlewares/PatientMiddleware');
const queueMiddleware = require('../middlewares/QueueMiddleware');



exports.index = async (req, res) => {
    let responseJson = {};
    responseJson.patient = {};

    responseJson.queue = await queueMiddleware.getQueue();
    responseJson.patient = await patientMiddleware.getPatientById(req.params.id);

    res.render('update', responseJson);
}

exports.updateAction = async (req, res) => {
    
    if(req.body.doctorKey=='false'){
        let responseJson = {};
        responseJson.patient = {};

        responseJson.queue = await queueMiddleware.getQueue();
        responseJson.patient = await patientMiddleware.getPatientById(req.body.id);
        responseJson.flashes = {error:'O campo medica não pode ser livre.'};

        
        res.render('update', responseJson);
        return;
    
    }

    req.body.telephone = req.body.telephone.replace(/\D/g, '');
    await queueMiddleware.updateQueue(req.body);
    await patientMiddleware.updatePatient(req.body);
    
    

    res.redirect('/');
}

exports.teste = async (req, res) => {
    let queue = await queueMiddleware.getQueue();
    let aux = false;
    

    queue.forEach((patient) => {
        if(patient._id == req.body.id) {
            aux = true;
        }
    })

    if(!aux){
        req.flash('error', 'Error: O paciente Já esta em atendimento!');
        res.redirect('/');
    }

    req.body.telephone = req.body.telephone.replace(/\D/g, '');
    await queueMiddleware.deleteQueue(req.body.id);
    await patientMiddleware.updatePatient(req.body);

    req.flash('sucess', 'Paciente Salvo com sucesso!');
    res.redirect('/');

}
