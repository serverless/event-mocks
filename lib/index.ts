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

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export const dictionary = {
  "aws:sns": snsTemplate as DeepPartial<SNSEvent>,
  "aws:sqs": sqsTemplate as DeepPartial<SQSEvent>,
  "aws:apiGateway": apiGatewayTemplate as DeepPartial<APIGatewayEvent>,
  "aws:scheduled": scheduledTemplate as DeepPartial<ScheduledEvent>,
  "aws:s3": s3Template as DeepPartial<S3Event>,
  "aws:kinesis": kinesisTemplate as DeepPartial<KinesisStreamEvent>,
  "aws:dynamo": dynamoTemplate as DeepPartial<DynamoDBStreamEvent>,
  "aws:cloudWatchLog":
    cloudwatchLogEventTemplate as DeepPartial<CloudWatchLogsEvent>,
  "aws:alexaSmartHome":
    alexaSmartHomeEventTemplate as DeepPartial<AlexaSmartHomeEvent>,
  "aws:alexaSkill": alexaSkillEventTemplate as DeepPartial<AlexaSkillEvent>,
  "aws:cloudWatch": cloudWatchEventTemplate as DeepPartial<CloudWatchEvent>,
  "aws:iot": {} as any,
  "aws:cognitoUserPool":
    cognitoUserPoolEventTemplate as DeepPartial<CognitoUserPoolEvent>,
  "aws:websocket": apiGatewayTemplate as DeepPartial<APIGatewayEvent>, // Websockets are included in APIG typedef: https://github.com/DefinitelyTyped/DefinitelyTyped/pull/32855/files
};

export default function createEvent<T extends keyof typeof dictionary, B>(
  eventType: T,
  body: typeof dictionary[T]
): typeof dictionary[T] {
  const event = dictionary[eventType];
  let generatedEvent = {};
  if (event) {
    generatedEvent = merge(cloneDeep(event), body);
  }
  return generatedEvent;
}
