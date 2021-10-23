module.exports.logger = (env) => (req, res, next) => {
    console.log('enviroment', env);
    console.log('METHOD', req.method);
    next();
 }

module.exports.validateAuth = (req, res, next) => {
    if(req.session && req.session.user){
        next();
    } else {
        // redirect a home
        res.redirect('/login');
    }
}