const config = {
    slackToken: process.env.SLACK_TOKEN,
    appPort: process.env.PORT || 8080,
    api: 'https://slack.com/api',
    imagesBaseUrl: 'https://www.topimagens.com',
    imagesStorageUrl: 'https://img1.topimagens.com/ti',
    defaultImageUrl: 'https://img1.topimagens.com/ti/bom-dia/bom-dia_024.jpg',
    goodMorningEnabled: process.env.GOOD_MORNING_ENABLED || true,
    goodAfternoonEnabled: process.env.GOOD_AFTERNOON_ENABLED || true,
    goodNightEnabled: process.env.GOOD_NIGHT_ENABLED || true
};

module.exports = config;
