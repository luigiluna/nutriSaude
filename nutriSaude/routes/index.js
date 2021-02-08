const express = require('express');
const passport = require('passport');

const homeController = require('../controllers/homeController');
const addController = require('../controllers/addController');
const attendancesController = require('../controllers/attendancesController'); 
const painelDoctorController = require('../controllers/painelDoctorController'); 



//rotas
const router = express.Router();

router.get('/', homeController.index);
router.get('/deleteQueue/:id', homeController.deleteQueueAction);

router.get('/attendances', attendancesController.index);
router.post('/attendancesAction', attendancesController.action); 

router.post('/addPatientAction', addController.addAction); 

router.get('/painelDoctor', painelDoctorController.index);
router.post('/painelDoctorAction', painelDoctorController.action); 

module.exports = router; 


