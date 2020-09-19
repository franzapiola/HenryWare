const jwt = require("jsonwebtoken");

function checkIsAdmin(req, res, next){
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	if ( token == null) return res.sendStatus(401)
	jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err, resultado) =>{
		if(err) return res.sendStatus(403);
		//Si el usuario loggeado es admin, pasa el check
		if (resultado.user.role === 'admin') return next();

		return res.sendStatus(401);
	});
}

function checkIsUser(req, res, next){
    const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	if ( token == null) return res.sendStatus(401)
	jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err, resultado) =>{
		if(err) return res.sendStatus(403);
		//Si el usuario no es admin, pasa el check
		if (resultado.user.role === 'user') return next();

        return res.sendStatus(401);
	});
}

function checkIsAuthenticated(req, res, next){
    const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	if ( token == null) return res.sendStatus(401)
	jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err, resultado) =>{
		if(err) return res.sendStatus(403);
		//Si el usuario es user o admin, pasa el check
		if (resultado.user.first_name != undefined) return next();

        return res.sendStatus(401);
	});
}

function checkIsNotAuthenticated(req, res, next){
    const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	if ( token == null) return res.sendStatus(401)
	jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err, resultado) =>{
		if(err) return res.sendStatus(403);
		//Si no hay información del usuario, es porque no hay sesión iniciada, entonces pasa el check
		if (resultado.user.first_name === undefined) return next();

        return res.sendStatus(401);
	});
}

module.exports = {
    checkIsAdmin,
    checkIsUser,
    checkIsAuthenticated,
	checkIsNotAuthenticated
};