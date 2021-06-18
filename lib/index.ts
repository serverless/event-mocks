import { merge, cloneDeep, Dictionary } from "lodash";
import {
  APIGatewayEvent,
  ScheduledEvent,
  S3Event,
  KinesisStreamEvent,
  DynamoDBStreamEvent,
  SQSEvent,
  SNSEvent,
  CloudWatchLogsEvent,
  CognitoUserPoolEvent,
} from "aws-lambda";
import {
  AlexaSmartHomeEvent,
  AlexaSkillEvent,
  CloudWatchEvent,
} from "aws-lambda";

import snsTemplate from "./events/aws/sns-template.json";
import sqsTemplate from "./events/aws/sqs-template.json";
import apiGatewayTemplate from "./events/aws/api-gateway-event-template.json";
import scheduledTemplate from "./events/aws/scheduled-template.json";
import s3Template from "./events/aws/s3-template.json";
import kinesisTemplate from "./events/aws/kinesis-template.json";
import dynamoTemplate from "./events/aws/dynamo-stream-event-template.json";
import cloudwatchLogEventTemplate from "./events/aws/cloud-watch-log-event-template.json";
import alexaSmartHomeEventTemplate from "./events/aws/alexa-smart-home-event-template.json";
import alexaSkillEventTemplate from "./events/aws/alexa-skill-event-template.json";
import cloudWatchEventTemplate from "./events/aws/cloud-watch-event-template.json";
import cognitoUserPoolEventTemplate from "./events/aws/cognito-user-pool-event-template.json";

export const dictionary = {
  "aws:sns": snsTemplate as SNSEvent,
  "aws:sqs": sqsTemplate as SQSEvent,
  "aws:apiGateway": apiGatewayTemplate as APIGatewayEvent,
  "aws:scheduled": scheduledTemplate as ScheduledEvent,
  "aws:s3": s3Template as S3Event,
  "aws:kinesis": kinesisTemplate as KinesisStreamEvent,
  "aws:dynamo": dynamoTemplate as DynamoDBStreamEvent,
  "aws:cloudWatchLog": cloudwatchLogEventTemplate as CloudWatchLogsEvent,
  "aws:alexaSmartHome": alexaSmartHomeEventTemplate as AlexaSmartHomeEvent,
  "aws:alexaSkill": alexaSkillEventTemplate as AlexaSkillEvent,
  "aws:cloudWatch": cloudWatchEventTemplate as CloudWatchEvent,
  "aws:iot": {} as any,
  "aws:cognitoUserPool": cognitoUserPoolEventTemplate as CognitoUserPoolEvent,
  "aws:websocket": apiGatewayTemplate as APIGatewayEvent, // Websockets are included in APIG typedef: https://github.com/DefinitelyTyped/DefinitelyTyped/pull/32855/files
};
// https://typeofnan.dev/creating-your-own-deeppartial-type-in-typescript/
type DeepPartial<T> = Partial<{ [P in keyof T]: DeepPartial<T[P]> }>;
export default function createEvent<T extends keyof typeof dictionary, B>(
  eventType: T,
  body: DeepPartial<typeof dictionary[T]>,
): typeof dictionary[T] {
  const event = dictionary[eventType];
  let generatedEvent = {};
  if (event) {
    generatedEvent = merge(cloneDeep(event), body);
  }
  return generatedEvent;
}
