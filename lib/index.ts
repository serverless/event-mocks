import { DynamoStreamEvent } from './events/dynamo-stream-event'

export function generateEvent(eventType: string, body: any) {
  switch(eventType) {
    case "http":
      return
    case "dynamo-stream-event":
      return new DynamoStreamEvent().generateEvent(body)
  }
}