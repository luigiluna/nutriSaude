const userMiddleware = require('../middlewares/UserMiddleware');
const configMiddleware = require('../middlewares/ConfigMiddleware');

exports.index = async (req, res) => {
    

    //TA NOJENTO!!!!!!!!!!!!!!! (EU ACHO)

    if(req.user.status == 'admin'){
        let responseJson = configMiddleware.getAll();
        res.render('configAdmin', responseJson);
    } 
    else if(req.user.status == 'doctor'){
        let responseJson = await userMiddleware.getDoctorById(req.user._id);
        res.render('config', responseJson);
    } 

    else {
        res.render('404');
    }




   
}

exports.action = async (req, res) => {
    await userMiddleware.updateUserByEmail(req.body);
    res.redirect('/config');
} 

exports.actionAdmin = async (req, res) => {
    configMiddleware.save(req.body); 
    res.redirect('/config');
}


    