const schedule = require('node-schedule');
const config = require('../config');
const SlackService = require('./SlackService');
const log = require('../utils/Log')('JobService');

const HOUR = 9;
const MINUTE = 0;

const JobService = {
    async init() {
        const rule = new schedule.RecurrenceRule();
        rule.dayOfWeek = [0, new schedule.Range(1, 5)];
        rule.hour = HOUR;
        rule.minute = MINUTE;

        schedule.scheduleJob(rule, () => {
            const now = new Date();
            log.info(
                'using bot %o to say GOOD MORNING',
                config.slackBotName
            );
            const dayOfWeek = now.toString().substring(0, 3).toUpperCase();

            SlackService.sayGoodMorning(dayOfWeek);
        });
    }
};

module.exports = JobService;
