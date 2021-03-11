const queueMiddleware = require('../middlewares/QueueMiddleware');
const patientMiddleware = require('../middlewares/PatientMiddleware');
const configMiddleware = require('../middlewares/ConfigMiddleware');

exports.index =  async (req, res) => {
    let patients = await queueMiddleware.getQueue();
    let responseJson = await configMiddleware.getAll();
    patients.consultationValue = responseJson.consultationValue;

    res.render('home', {patients});

}

//Validar
exports.deleteQueueAction = async (req, res) => {
    let queue = await queueMiddleware.getQueue();
    let aux = false;
    

    queue.forEach((patient, index) => {
        if(patient._id == req.params.id) {
            if(patient.doctorKey == 'false'){
                req.flash('error', 'Error: O campo medico não pode ser livre');
                res.redirect('/');
                return;
            }
            aux = true;
        }

    })

    if(!aux){
        req.flash('error', 'Error: O paciente Já esta em atendimento!');
        res.redirect('/');
        return;
    }

   
    queueMiddleware.deleteQueue(req.params.id);
    req.flash('sucess', 'Deletado com sucesso');
    res.redirect('/');
}

exports.addAction = async (req, res) => {
    
    let data = new Date();
    req.body.date = `${data.getFullYear()}-${data.getMonth()+1}-${data.getDate()}`;
    req.body.telephone = req.body.telephone.replace(/\D/g, '');
    
    
    let id = await patientMiddleware.addPatient(req.body);
    await queueMiddleware.addQueue(req.body, id);
    
    

    res.redirect('/');
}

