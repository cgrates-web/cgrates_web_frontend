import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  tpid()               { 'tptest'; },
  tenant()             { faker.lorem.word(); },
  customId()           { faker.lorem.word(); },
  filterType()         { '*string'; },
  filterFieldName()    { faker.lorem.word(); },
  filterFieldValues()  { faker.lorem.word(); },
  activationInterval() { faker.lorem.word(); }
});
