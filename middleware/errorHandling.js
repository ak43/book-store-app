const { constants } = require('../middleware/constant');

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case constants.BAD_REQUEST:
            res.json({ message: "Validation failed or Bad Request" });
            break;

        case constants.UNAUTHORIZED:
            res.json({ title: "Validation failed or Bad Request", stackTrace: error.stackTrace });
            break;

        case constants.FORBIDDEN:
            res.json({ title: "Forbidden", stackTrace: error.stackTrace });
            break;

        case constants.NOT_FOUND:
            res.json({ title: "Not Found", stackTrace: error.stackTrace });
            break;

        case constants.CONFLICT:
            res.json({ title: "Conflict Occurred", stackTrace: error.stackTrace });
            break;

        case constants.SERVER_ERROR:
            res.json({ title: "Server Error", stackTrace: error.stackTrace });
            break;
    }

};

module.exports = errorHandler;