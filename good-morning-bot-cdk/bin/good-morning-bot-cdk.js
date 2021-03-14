#!/usr/bin/env node

const cdk = require('@aws-cdk/core');
const { GoodMorningBotCdkStack } = require('../lib/good-morning-bot-cdk-stack');

const app = new cdk.App();
new GoodMorningBotCdkStack(app, 'GoodMorningBotCdkStack');
