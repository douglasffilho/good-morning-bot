const SlackService = require('./services/SlackService');

exports.handler =  async function(event, context) {
    console.log("EVENT: \n" + JSON.stringify(event, null, 2))
    dayOfWeek = new Date().toString().substring(0, 3).toUpperCase()
    return SlackService.sayGoodMorning(dayOfWeek)
  }
  