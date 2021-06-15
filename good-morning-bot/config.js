const config = {
    slackToken: process.env.SLACK_TOKEN,
    appPort: process.env.PORT || 8080,
    api: 'https://slack.com/api',
    imagesBaseUrl: 'https://www.recadosonline.com',
    imagesStorageUrl: 'https://img1.recadosonline.com',
    defaultImageUrl: 'https://img1.recadosonline.com/105/222.gif',
    goodMorningEnabled: process.env.GOOD_MORNING_ENABLED || true,
    goodAfternoonEnabled: process.env.GOOD_AFTERNOON_ENABLED || true,
    goodNightEnabled: process.env.GOOD_NIGHT_ENABLED || true
};

module.exports = config;
