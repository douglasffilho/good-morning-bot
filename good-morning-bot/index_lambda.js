const SlackService = require('./services/SlackService');
const DateUtil = require('./utils/DateUtil');
const log = require('./utils/Log')('LambdaExecution');

const execs = {
    'GOOD-MORNING': (dayOfWeek) => {
        SlackService.sayGoodMorning(dayOfWeek);
    },
    'GOOD-AFTERNOON': (dayOfWeek) => {
        SlackService.sayGoodAfternnon(dayOfWeek);
    },
    'GOOD-NIGHT': (dayOfWeek) => {
        SlackService.sayGoodNight(dayOfWeek);
    }
};

const handler = async (event, context) => {
    log.info('Slack Notification Event triggered: %o', event);

    const dayOfWeek = await DateUtil.getDayOfWeek();
    const dayTime = await DateUtil.getDayTime();
    const exec = `GOOD-${dayTime}`;

    return execs[exec](dayOfWeek);
};

module.exports = { handler };
