const logger  = require('./middleware/logger');
const express = require('express');
const app = express();

require('./startup/logging')(app);
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();



const port = process.env.PORT || 3000;
const server = app.listen(port, ()=> logger.info(`Listening on port ${port}....`));

module.exports = server;