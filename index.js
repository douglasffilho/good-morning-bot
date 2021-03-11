const config = require('./config');

const run = async () => {
    console.log(config.slackToken);
    console.log(config.slackBotName);
};

run();
