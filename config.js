const config = {
    slackToken: process.env.SLACK_TOKEN,
    slackBotName: process.env.SLACK_BOT_NAME || 'good-morning-bot'
};

module.exports = config;
