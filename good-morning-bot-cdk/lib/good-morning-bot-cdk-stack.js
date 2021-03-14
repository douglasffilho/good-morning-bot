const cdk = require('@aws-cdk/core');
const sm = require('@aws-cdk/aws-secretsmanager');
const lambda = require('@aws-cdk/aws-lambda');
const events = require('@aws-cdk/aws-events');
const targets = require('@aws-cdk/aws-events-targets');

class GoodMorningBotCdkStack extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const slackTokenARN = process.env.SLACK_TOKEN_ARN;

    const secretSlackToken = sm.Secret.fromSecretCompleteArn(slackTokenARN);

    const fn = new lambda.Function(this, 'GoodMorningBotLambdaFunction', {
        runtime: lambda.Runtime.NODEJS_14_X,
        code: lambda.Code.fromAsset('../good-morning-bot'),
        handler: 'index_lambda.handler',
        environment: {
            'DEBUG': 'app:*',
            'SLACK_TOKEN': secretSlackToken.secretValue.toString()
        }
    });

    new events.Rule(this, 'GoodMorningBotCronMorning',{
        schedule: events.Schedule.cron({
            hour: 9,
            weekDay: 'MON-FRI'
        }),
        targets: [new targets.LambdaFunction(fn)]
    });

    new events.Rule(this, 'GoodMorningBotCronAfternoon',{
        schedule: events.Schedule.cron({
            hour: 13,
            weekDay: 'MON-FRI'
        }),
        targets: [new targets.LambdaFunction(fn)]
    });

    new events.Rule(this, 'GoodMorningBotCronNight',{
        schedule: events.Schedule.cron({
            hour: 18,
            minute: 30,
            weekDay: 'MON-FRI'
        }),
        targets: [new targets.LambdaFunction(fn)]
    });
  }
}

module.exports = { GoodMorningBotCdkStack }
