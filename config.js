const config = {
    slackToken: process.env.SLACK_TOKEN,
    slackBotName: process.env.SLACK_BOT_NAME || 'good-morning-bot',
    appPort: process.env.PORT || 8080,
    api: 'https://slack.com/api',
    imagesBaseUrl: 'https://www.topimagens.com',
    imagesStorageUrl: 'https://img1.topimagens.com/ti',
    defaultImageUrl: 'https://img1.topimagens.com/ti/bom-dia/bom-dia_024.jpg'
};

module.exports = config;
