"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dynamo_stream_event_1 = require("./events/dynamo-stream-event");
function generateEvent(eventType, body) {
    switch (eventType) {
        case "http":
            return;
        case "dynamo-stream-event":
            return dynamo_stream_event_1.DynamoStreamEvent.generate(body);
    }
}
exports.generateEvent = generateEvent;
//# sourceMappingURL=index.js.map