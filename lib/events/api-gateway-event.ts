import merge from "deepmerge"
import * as event from "./api-gateway-event-template.json"
import { APIGatewayEvent } from "aws-lambda"

export class ApiGatewayEvent {
  public generateEvent(body: any): APIGatewayEvent {
    return merge(event as unknown as APIGatewayEvent, body) as APIGatewayEvent
  }
}