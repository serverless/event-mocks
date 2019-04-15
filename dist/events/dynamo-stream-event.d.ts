import { DynamoDBStreamEvent } from "aws-lambda";
export declare class DynamoStreamEvent {
    static generate(body: any): DynamoDBStreamEvent;
}
