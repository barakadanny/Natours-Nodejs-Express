const AppError = require('./../utils/appError');

// 🦠 🦠
// TODO: Work on the message on prod, it's not displaying the right message, it jump to the else statement
// 🦠 🦠

const handleCastErrorDB = err => {
   const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
}

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
}

const sendErrorProd = (err, res) => {
    // Operational, trusted error: send message to client
    // Operational errors are errors that we can predict, such as a user not found error
    if(err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    } else {
        // Programming or other unknown error: don't leak error details
        // 1) Log error
        console.error('ERROR', err);

        // 2) Send generic message
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong'
        })
    }
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500; // default to 500
    err.status = err.status || 'error'; // default to error

    if(process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === 'production') {
        let error = {...err}; // this will create a hard copy of the err object
        if(error.name === 'CastError') error = handleCastErrorDB(error);

        sendErrorProd(error, res);
    }

}
