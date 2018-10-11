import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  tpid:                   'tptest',
  tenant()                { return faker.lorem.word(); },
  customId()              { return faker.lorem.word(); },
  filterIds()             { return faker.lorem.word(); },
  activationInterval()    { return faker.lorem.word(); },
  sorting()               { return faker.lorem.word(); },
  supplierId()            { return faker.lorem.word(); },
  supplierFilterIds()     { return faker.lorem.word(); },
  supplierAccountIds()    { return faker.lorem.word(); },
  supplierRatingplanIds() { return faker.lorem.word(); },
  supplierResourceIds()   { return faker.lorem.word(); },
  supplierStatIds()       { return faker.lorem.word(); },
  supplierWeight: 10,
  blocker: false,
  weight: 100
});
