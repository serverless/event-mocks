import { expect } from "chai";
import createEvent from "./index";

describe("creating a new SNS event", () => {
  it("should return a valid event", () => {
    const event = createEvent("aws:sns", {
      Records: [
        {
          Sns: {
            Message: "trigger-email",
          },
        },
      ],
    } as any);
    expect(event.Records[0].Sns.Message).to.equal("trigger-email");
    expect(event.Records[0].Sns.Type).to.equal("Notification");
  });
});

describe("createSqsEvent()", () => {
  it("should return SQS mocked event", () => {
    const event = createEvent("aws:sqs", {
      Records: [
        {
          body: JSON.stringify({
            foo: "bar",
          }),
        },
      ],
    } as any);

    expect(event.Records[0].body).to.equal("{\"foo\":\"bar\"}");
    expect(event.Records[0].eventSource).to.equal("aws:sqs");
  });
});

describe("createApigEvent()", () => {
  it("should return APIG mocked event", () => {
    const event = createEvent("aws:apiGateway", {
      body: JSON.stringify({
        first_name: "Sam",
        last_name: "Smith",
      }),
    } as any);
    const parsedBody = JSON.parse(event.body || "");

    expect(parsedBody.first_name).to.equal("Sam");
    expect(parsedBody.last_name).to.equal("Smith");
    expect(event.httpMethod).to.equal("GET");
  });
});

it("should return APIG mocked event with custom authorizer", () => {
  const event = createEvent("aws:apiGateway", {
    requestContext: {
      authorizer: {
        user_info: JSON.stringify({
          id: 1234,
          name: "Sam Smith",
        }),
      },
    },
  } as any);

  expect(!!event.requestContext.authorizer).to.be.true;

  const authorizer = event.requestContext.authorizer || {};
  const parsedAuthorizer = JSON.parse(authorizer.user_info || "");
  expect(parsedAuthorizer.id).to.eql(1234);
  expect(parsedAuthorizer.name).to.eql("Sam Smith");
});

describe("createWebsocketEvent()", () => {
  it("should return websocket mocked event", () => {
    const event = createEvent("aws:websocket", {
      body: JSON.stringify({
        first_name: "Sam",
        last_name: "Smith",
      }),
      requestContext: {
        connectedAt: 123,
        connectionId: "abc123",
      },
    } as any);
    const parsedBody = JSON.parse(event.body || "");

    expect(parsedBody.first_name).to.equal("Sam");
    expect(parsedBody.last_name).to.equal("Smith");
    expect(event.requestContext.connectedAt).to.equal(123);
    expect(event.requestContext.connectionId).to.equal("abc123");
  });
});

describe("createS3Event()", () => {
  it("should return S3 mocked event", () => {
    const event = createEvent("aws:s3", {
      Records: [
        {
          s3: {
            bucket: {
              name: "my-bucket-name",
            },
            object: {
              key: "object-key",
            },
          },
        },
      ],
    } as any);

    expect(event.Records[0].s3.bucket.name).to.equal("my-bucket-name");
    expect(event.Records[0].s3.object.key).to.equal("object-key");
    expect(event.Records[0].eventName).to.equal("ObjectCreated:Put");
  });

  it("should return S3 mocked event without side-effect", () => {
    const event = createEvent("aws:s3", {
      Records: [
        {
          s3: {
            bucket: {
              name: "my-bucket-name",
            },
            object: {
              key: "object-key",
            },
          },
        },
      ],
    } as any);

    const event2 = createEvent("aws:s3", {
      Records: [
        {
          s3: {
            bucket: {
              name: "my-bucket-name",
            },
            object: {
              key: "object-key-2",
            },
          },
        },
      ],
    } as any);

    expect(event.Records[0].s3.bucket.name).to.equal("my-bucket-name");
    expect(event.Records[0].s3.object.key).to.equal("object-key");
    expect(event2.Records[0].s3.object.key).to.equal("object-key-2");
    expect(event.Records[0].eventName).to.equal("ObjectCreated:Put");
  });
});

describe("createScheduledEvent()", () => {
  it("should return Scheduled mocked event", () => {
    const event = createEvent("aws:scheduled", {
      region: "us-west-2",
    } as any);

    expect(event.region).to.equal("us-west-2");
    expect(event["detail-type"]).to.equal("Scheduled Event");
  });
});

describe("createKinesisEvent()", () => {
  it("should return Kinesis mocked event", () => {
    const event = createEvent("aws:kinesis", {
      Records: [
        {
          kinesis: {
            data: Buffer.from("kinesis test").toString("base64"),
          },
        },
      ],
    } as any);

    expect(
      Buffer.from(event.Records[0].kinesis.data, "base64").toString("ascii"),
    ).to.equal("kinesis test");
  });
});

describe("createCloudWatchEvent()", () => {
  it("should return a valid event", () => {
    const event = createEvent("aws:cloudWatch", {
      "detail-type": "Something has been deleted.",
      "region": "us-east-1",
    } as any);
    expect(event["detail-type"]).to.equal("Something has been deleted.");
    expect(event.region).to.equal("us-east-1");
  });
});

describe("createCloudWatchLogEvent()", () => {
  it("should return a valid event", () => {
    const event = createEvent("aws:cloudWatchLog", {
      awslogs: {
        data: "Some gzipped, then base64 encoded data",
      },
    }) as any;
    expect(event.awslogs.data).to.equal(
      "Some gzipped, then base64 encoded data",
    );
  });
});

describe("createAlexaSkillEvent()", () => {
  it("should return a valid event", () => {
    const event = createEvent("aws:alexaSkill", {
      request: {
        type: "CanFulfillIntentRequest",
      },
      context: {
        System: {
          device: {
            deviceId: "myDevice",
          },
        },
      },
    } as any);
    expect(event.request.type).to.equal("CanFulfillIntentRequest");
    expect(event.context.System.device.deviceId).to.equal("myDevice");
  });
});

describe("createAlexaSmartHomeEvent()", () => {
  it("should return a valid event", () => {
    const event = createEvent("aws:alexaSmartHome", {
      payload: {
        switchControlAction: "TURN_OFF",
      },
    } as any);
    expect(event.payload.switchControlAction).to.equal("TURN_OFF");
  });
});

describe("createIotEvent()", () => {
  it("should return a valid event", () => {
    const event = createEvent("aws:iot", {
      this: {
        can: {
          be: "anything I want",
        },
      },
    } as any);
    expect(event.this.can.be).to.equal("anything I want");
  });
});

describe("createCognitoPoolEvent()", () => {
  it("should return a valid event", () => {
    const event = createEvent("aws:cognitoUserPool", {
      userName: "notAJ",
    } as any);
    expect(event.userName).to.eql("notAJ");
  });
});
