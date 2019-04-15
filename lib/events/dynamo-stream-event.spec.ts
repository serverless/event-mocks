import { DynamoStreamEvent } from './dynamo-stream-event'
import * as mockEvent from './dynamo-stream-event-template.json'
import { expect } from 'chai'

describe ('creating a new event', () => {
  it('should return a valid event', () => {
    const result = new DynamoStreamEvent().generateEvent({})
    expect(JSON.stringify(result)).to.equal(JSON.stringify(mockEvent))
  })
})