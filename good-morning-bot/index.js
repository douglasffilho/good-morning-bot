const express = require('express');
const config = require('./config');
const JobService = require('./services/JobService');
const log = require('./utils/Log')('index');
const app = express();

app.listen(config.appPort, () => {
    log.info('running over port %o', config.appPort);
    JobService.init();
});
