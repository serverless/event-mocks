"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var deepmerge_1 = __importDefault(require("deepmerge"));
var event = __importStar(require("./dynamo-stream-event.json"));
var DynamoStreamEvent = /** @class */ (function () {
    function DynamoStreamEvent() {
    }
    DynamoStreamEvent.generate = function (body) {
        return deepmerge_1.default(event, body);
    };
    return DynamoStreamEvent;
}());
exports.DynamoStreamEvent = DynamoStreamEvent;
//# sourceMappingURL=dynamo-stream-event.js.map