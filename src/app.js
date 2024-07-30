require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const createError = require('http-errors');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/connectDB.js');

const app = express();
const PORT = process.env.PORT || 3000;

const indexRouter = require('./routes/index');

const errorHandler = require('./middlewares/errorHandler');

// connect to MongoDB
connectDB();

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError.NotFound());
});

// pass any unhandled errors to the error handler
app.use(errorHandler);

mongoose.connection.once('open', () => {
	console.log('Connected to MongoDB.');
	app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));
});
