import { merge, cloneDeep } from 'lodash'
import { APIGatewayEvent, ScheduledEvent, S3Event, KinesisStreamEvent, DynamoDBStreamEvent, SQSEvent, SNSEvent, CloudWatchLogsEvent, CognitoUserPoolEvent } from 'aws-lambda'
import { AlexaSmartHomeEvent, AlexaSkillEvent, CloudWatchEvent } from '../globals'
import { GeneratedEvent } from './generatedEvent'
import snsTemplate from './events/aws/sns-template.json'
import sqsTemplate from './events/aws/sqs-template.json'
import apiGatewayTemplate from './events/aws/api-gateway-event-template.json'
import scheduledTemplate from './events/aws/scheduled-template.json'
import s3Template from './events/aws/s3-template.json'
import kinesisTemplate from './events/aws/kinesis-template.json'
import dynamoTemplate from './events/aws/dynamo-stream-event-template.json'
import cloudwatchLogsEventTemplate from './events/aws/cloudwatch-logs-event-template.json'
import alexaSmartHomeEventTemplate from './events/aws/alexa-smart-home-event-template.json'
import alexaSkillEventTemplate from './events/aws/alexa-skill-event-template.json'
import cloudWatchEventTemplate from './events/aws/cloud-watch-event-template.json'
import cognitoUserPoolEventTemplate from './events/aws/cognito-user-pool-event-template.json'

const dictionary: any = {
  'aws:sns':  snsTemplate as SNSEvent,
  'aws:sqs': sqsTemplate as SQSEvent,
  'aws:apiGateway': apiGatewayTemplate as APIGatewayEvent,
  'aws:scheduled': scheduledTemplate as ScheduledEvent,
  'aws:s3': s3Template as S3Event,
  'aws:kinesis': kinesisTemplate as KinesisStreamEvent,
  'aws:dynamo': dynamoTemplate as DynamoDBStreamEvent,
  'aws:cloudwatchLogEvent': cloudwatchLogsEventTemplate as CloudWatchLogsEvent,
  'aws:alexaSmartHomeEvent': alexaSmartHomeEventTemplate as AlexaSmartHomeEvent,
  'aws:alexaSkillEvent': alexaSkillEventTemplate as AlexaSkillEvent,
  'aws:cloudWatchEvent': cloudWatchEventTemplate as CloudWatchEvent,
  'aws:iot': {},
  'aws:cognitoUserPool': cognitoUserPoolEventTemplate as CognitoUserPoolEvent,
}

export default function createEvent(eventType: string, body: any): GeneratedEvent {
  const event = dictionary[eventType]
  let generatedEvent = {} as GeneratedEvent
  if (event) {
    generatedEvent = merge(cloneDeep(event), body)
  }
  return generatedEvent
}
