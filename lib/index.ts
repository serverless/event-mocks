import { merge, cloneDeep } from 'lodash'
import { APIGatewayEvent, ScheduledEvent, S3Event, KinesisStreamEvent, DynamoDBStreamEvent, SQSEvent, SNSEvent } from "aws-lambda"
import { GeneratedEvent } from './generatedEvent'

const dictionary: any = {
  'aws:sns': require('./events/aws/sns-template.json') as SNSEvent,
  'aws:sqs': require('./events/aws/sqs-template.json') as SQSEvent,
  'aws:apiGateway': require('./events/aws/api-gateway-event-template.json') as APIGatewayEvent,
  'aws:scheduled': require('./events/aws/scheduled-template.json') as ScheduledEvent,
  'aws:s3': require('./events/aws/s3-template.json') as S3Event,
  'aws:kinesis': require('./events/aws/kinesis-template.json') as KinesisStreamEvent,
  'aws:dynamo': require('./events/aws/dynamo-stream-event-template.json') as DynamoDBStreamEvent
}

export default function createEvent(eventType: string, body: any): GeneratedEvent {
  const event = dictionary[eventType]
  let generatedEvent = {} as GeneratedEvent
  if (event) {
    generatedEvent = merge(cloneDeep(event), body)
  }
  return generatedEvent
}
