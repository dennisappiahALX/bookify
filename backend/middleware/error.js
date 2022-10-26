const logger  = require('../middleware/logger');

module.exports = function(err, req, res, next) {

    logger.error(err.message, err)
    res.status(500).send('Something happened!');
}