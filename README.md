# good-morning-bot
A Slack Bot to Notify Your Channels Random Good Morning Messages

# How To Run
- ***Standalone version*** (Requires NodeJS 14.16.0)
  ```bash
  cd good-morning-bot &&/
  npm install -g yarn &&/
  yarn &&/
  DEBUG=app:* SLACK_TOKEN=<slack bot token with chat permissions> PORT=<app run port (8081 is default value)> GOOD_MORNING_ENABLED=true GOOD_AFTERNOON_ENABLED=true GOOD_NIGHT_ENABLED=true yarn start

  ```
- ***AWS Lambda Version*** (Requires NodeJS Environment)
  ```bash
  npm install -g yarn &&/
  npm install -g cdk &&/
  cd good-morning-bot &&/
  yarn &&/
  cd ../good-morning-bot-cdk &&/
  yarn &&/
  SLACK_TOKEN_ARN=<secrets manager ARN to get lambda execution hidden SLACK_TOKEN env var> cdk synth &&/
  cdk deploy
  ```

## Sample
![image](https://user-images.githubusercontent.com/23297944/110998150-27ed6a80-835d-11eb-962c-1b126f51af09.png)
