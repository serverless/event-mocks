import { APIGatewayEvent, ScheduledEvent, S3Event, KinesisStreamEvent, DynamoDBStreamEvent, SQSEvent, SNSEvent } from "aws-lambda";

export type GeneratedEvent =
  | APIGatewayEvent
  | ScheduledEvent
  | S3Event
  | KinesisStreamEvent
  | DynamoDBStreamEvent
  | SQSEvent
  | SNSEvent;
