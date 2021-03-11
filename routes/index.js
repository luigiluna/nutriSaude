const express = require('express');


const homeController = require('../controllers/homeController');
const updateController = require('../controllers/updateController');
const attendancesController = require('../controllers/attendancesController'); 
const painelDoctorController = require('../controllers/painelDoctorController'); 
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/AuthMiddleware');
const configController = require('../controllers/configController');


//rotas
const router = express.Router();

router.get('/', authMiddleware.isLogged, homeController.index);

router.get('/login', userController.login);
router.post('/login', userController.loginAction);

router.post('/teste', updateController.teste);

router.get('/logout', authMiddleware.isLogged, userController.logout);

router.get('/register', userController.register);
router.post('/registerAction', userController.registerAction);

router.get('/attendances', authMiddleware.isLogged, attendancesController.index);
router.post('/attendancesAction', attendancesController.action); 
router.post('/searchPatient', attendancesController.onePatient); 

router.post('/addPatientAction', authMiddleware.isLogged, homeController.addAction); 
router.get('/updatePatient/:id', authMiddleware.isLogged, updateController.index);
router.post('/updatePatientAction', updateController.updateAction);
router.get('/deleteQueue/:id', authMiddleware.isLogged, homeController.deleteQueueAction);

router.get('/painelDoctor', authMiddleware.isLogged, painelDoctorController.index);
router.post('/painelDoctorAction', painelDoctorController.action); 
router.post('/painelDoctorAdmin', painelDoctorController.actionAdmin); 


router.get('/config', configController.index);
router.post('/configAction', configController.action);
router.post('/configAdmin', configController.actionAdmin);

module.exports = router; 


