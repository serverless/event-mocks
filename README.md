# Event Mocks
A small library that includes details mocks of AWS Lambda event sources. Useful for use when unit testing your Lambda functions. Supported Event Sources are: SNS, SQS, DynamoDB, API Gateway, S3, & Scheduled.

The library simply uses default event source mock templates and merge it with any overwrite you provide. [Check out the JSON template files](./lib/events) to learn more about the data structure of each event source.

## Usage

### SNS

```js
import createEvent from '@serverless/event-mocks'

const mocked = createEvent(
  'aws:sns',
  {
    Records: [{
      Sns: {
        Message: 'trigger-email'
      }
    }]
  });
```

### API Gateway

```js
import createEvent from '@serverless/event-mocks'

const event = createEvent(
  'aws:apiGateway',
  {
    body: {
      first_name: 'Sam',
      last_name: 'Smith'
    }
  });
```

### S3

```js
import createEvent from '@serverless/event-mocks'

const event = createEvent(
  'aws:s3',
  {
    Records: [{
      eventName: 'ObjectCreated:Put',
      s3: {
        bucket: {
          name: 'my-bucket-name'
        },
        object: {
          key: 'object-key'
        }
      }
    }]
  });
```

### Scheduled

```js
import createEvent from '@serverless/event-mocks'

const event = createEvent(
  'aws:scheduled',
  {
    region: 'us-west-2'
  });
```

### Kinesis

```js
import createEvent from '@serverless/event-mocks'

const event = createEvent(
  'aws:kinesis',
  {
    data: new Buffer('this is test data').toString('base64')
  });
