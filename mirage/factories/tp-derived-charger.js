import { Factory, faker } from 'ember-cli-mirage';
export default Factory.extend({
  tpid() {
    return faker.lorem.word();
  },
  loadid() {
    return faker.lorem.word();
  },
  direction() {
    return faker.lorem.word();
  },
  tenant() {
    return faker.lorem.word();
  },
  category() {
    return faker.lorem.word();
  },
  account() {
    return faker.lorem.word();
  },
  subject() {
    return faker.lorem.word();
  },
  destinationIds() {
    return `tag-${faker.random.number(100)}`;
  },
  runid() {
    return faker.lorem.word();
  },
  runFilters() {
    return faker.lorem.word();
  },
  reqTypeField() {
    return faker.lorem.word();
  },
  directionField() {
    return faker.lorem.word();
  },
  tenantField() {
    return faker.lorem.word();
  },
  categoryField() {
    return faker.lorem.word();
  },
  accountField() {
    return faker.lorem.word();
  },
  subjectField() {
    return faker.lorem.word();
  },
  destinationField() {
    return faker.lorem.word();
  },
  setupTimeField() {
    return faker.lorem.word();
  },
  pddField() {
    return faker.lorem.word();
  },
  answerTimeField() {
    return faker.lorem.word();
  },
  usageField() {
    return faker.lorem.word();
  },
  supplierField() {
    return faker.lorem.word();
  },
  disconnectCauseField() {
    return faker.lorem.word();
  },
  ratedField() {
    return faker.lorem.word();
  },
  costField() {
    return faker.lorem.word();
  },
  createdAt() {
    return faker.date.past();
  },
});
