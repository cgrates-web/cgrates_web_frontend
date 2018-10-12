import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  cgrid()             { return faker.random.alphaNumeric(); },
  runId:              '*default',
  originHost()        { return faker.internet.ip(); },
  source()            { return faker.lorem.word(); },
  originId()          { return faker.random.uuid(); },
  tor:                '*voice',
  requestType:        '*prepaid',
  tenant:             'cgrates.org',
  category:           'call',
  account()           { return faker.random.alphaNumeric(); },
  subject()           { return faker.random.alphaNumeric(); },
  destination()       { return faker.phone.phoneNumber(); },
  setupTime()         { return faker.date.past(); },
  answerTime()        { return faker.date.past(); },
  usage()             { return faker.random.number(1000) / 10; },
  extraFields:        '{}',
  costSource:         'CDRS',
  cost()              { return faker.random.number(10) / 10; },
  costDetails:        '{ "test": "test", "test": [0,1,2,3] }',
  extraInfo:          ''
});
