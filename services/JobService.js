const schedule = require('node-schedule');
const config = require('../config');
const SlackService = require('./SlackService');
const log = require('../utils/Log')('JobService');

const generateRule = (hour, minute) => {
    const rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [0, new schedule.Range(1, 5)];
    rule.hour = hour;
    rule.minute = minute;

    return rule;
};

const getGoodMorningRule = () => {
    return generateRule(9, 0);
};

const getGoodAfternoon = () => {
    return generateRule(13, 0);
};

const getGoodNight = () => {
    return generateRule(18, 30);
};

const scheduleService = (rule, execute, name) => {
    log.info('scheduling %o', name);
    schedule.scheduleJob(rule, () => {
        const now = new Date();
        log.info('using bot to say %o', name);
        const dayOfWeek = now.toString().substring(0, 3).toUpperCase();

        execute(dayOfWeek);
    });
};

const JobService = {
    async init() {
        const execs = [
            {
                rule: getGoodMorningRule(),
                exec: SlackService.sayGoodMorning,
                name: 'GOOD MORNING',
                enabled: config.goodMorningEnabled
            },
            {
                rule: getGoodAfternoon(),
                exec: SlackService.sayGoodAfternnon,
                name: 'GOOD AFTERNOON',
                enabled: config.goodAfternoonEnabled
            },
            {
                rule: getGoodNight(),
                exec: SlackService.sayGoodNight,
                name: 'GOOD NIGHT',
                enabled: config.goodNightEnabled
            }
        ];
        execs.forEach((execution) => {
            const { rule, exec, name, enabled } = execution;

            if (enabled) scheduleService(rule, exec, name);
        });
    }
};

module.exports = JobService;
