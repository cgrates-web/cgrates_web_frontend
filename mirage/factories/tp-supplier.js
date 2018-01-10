import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  tpid()               { 'tptest' },
  tenant()             { faker.lorem.word() },
  customId()           { faker.lorem.word() },
  filterIds()          { faker.lorem.word() },
  activationInterval() { faker.lorem.word() },
  sorting()            { faker.lorem.word() },
  supplierId()         { faker.lorem.word() },
  supplierFilterIds()  { faker.lorem.word() },
  supplierAccountIds() { faker.lorem.word() },
  supplierRatingplanIds() { faker.lorem.word() },
  supplierResourceIds()   { faker.lorem.word() },
  supplierStatIds()    { faker.lorem.word() },
  supplierWeight: 10,
  blocker: false,
  weight: 100
});
