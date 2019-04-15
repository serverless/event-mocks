"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dynamo_stream_event_1 = require("./dynamo-stream-event");
var chai_1 = require("chai");
describe('creating a new event', function () {
    it('should return a valid event', function () {
        var result = dynamo_stream_event_1.DynamoStreamEvent.generate({ foo: 'bar' });
        chai_1.expect(result).to.equal({});
    });
});
//# sourceMappingURL=dynamo-stream-event.spec.js.map