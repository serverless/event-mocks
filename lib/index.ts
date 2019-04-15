import { merge, cloneDeep } from 'lodash'
import { APIGatewayEvent, ScheduledEvent, S3Event, KinesisStreamEvent, DynamoDBStreamEvent, SQSEvent, SNSEvent } from "aws-lambda"

const dictionary: any = {
  'aws:sns': require('./events/aws/sns-template.json') as SNSEvent,
  'aws:sqs': require('./events/aws/sqs-template.json') as SQSEvent,
  'aws:apiGateway': require('./events/aws/api-gateway-event-template.json') as APIGatewayEvent,
  'aws:scheduled': require('./events/aws/scheduled-template.json') as ScheduledEvent,
  'aws:s3': require('./events/aws/s3-template.json') as S3Event,
  'aws:kinesis': require('./events/aws/kinesis-template.json') as KinesisStreamEvent,
  'aws:dynamo': require('./events/aws/dynamo-stream-event-template.json') as DynamoDBStreamEvent
}

export default function createEvent(eventType: string, body: any): any {
  const event = dictionary[eventType]
  if (event) {
    return merge(cloneDeep(event), body)
  }
}
