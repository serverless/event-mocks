import merge from "deepmerge"
import * as event from "./dynamo-stream-event-template.json"
import { DynamoDBStreamEvent } from "aws-lambda"

export class DynamoStreamEvent {
  public constructor() {}

  public generateEvent(body: any): DynamoDBStreamEvent {
    return merge(event as unknown as DynamoDBStreamEvent, body) as DynamoDBStreamEvent
  }
}