const User = require('../models/User');


exports.login = (req, res) => {
    if(req.query.fail){
        res.render('login', {warning: true});
    } 
    else {
        res.render('login');
    }
}

exports.loginAction = (req, res) => {
    const auth = User.authenticate();

    auth(req.body.email, req.body.password, (error, result)=>{
        if(!result){
            console.log(error);
            req.flash('error', 'Email e/ou Senha invalidos');
            res.redirect('/login');
            return;
        }

        req.login(result, ()=>{});


        res.redirect('/');
    });
}

exports.register = (req, res) => {
    res.render('register');
}

exports.registerAction = async (req, res) => {
    req.body.firstName = await capitalize(req.body.firstName);
    req.body.lastName = await capitalize(req.body.lastName);

    User.register(new User(req.body), req.body.password, (error) => {
        if(error){
            console.log('Erro ao registrar: '+error);
            req.flash('error', 'Erro ao registrar');
            res.redirect('/register');
            return;
        }
        res.redirect('/login');
    });
}

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}


 async function capitalize(string) {
    return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
