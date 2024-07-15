const createError = require('http-errors');

const errorHandler = (err, req, res) => {
	console.error(err);
	// if the error is safe to expose to client
	if (err.expose === true) return res.status(err.status || 500).send(err);
	res.status(500).send(createError.InternalServerError());
};

module.exports = errorHandler;
