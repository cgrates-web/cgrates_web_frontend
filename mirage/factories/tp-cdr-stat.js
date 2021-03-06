import { Factory } from 'ember-cli-mirage';
import faker from 'faker';
export default Factory.extend({
  tpid() {
    return faker.lorem.word();
  },
  tag() {
    return `tag-${faker.random.number(100)}`;
  },
  queueLength() {
    return faker.random.number(100);
  },
  timeWindow() {
    return `${faker.random.number(24)}h`;
  },
  saveInterval() {
    return `${faker.random.number(60)}s`;
  },
  setupInterval() {
    return faker.lorem.word();
  },
  tors() {
    return faker.lorem.word();
  },
  cdrHosts() {
    return faker.lorem.word();
  },
  cdrSources() {
    return faker.lorem.word();
  },
  reqTypes() {
    return faker.lorem.word();
  },
  directions() {
    return faker.lorem.word();
  },
  tenants() {
    return faker.lorem.word();
  },
  categories() {
    return faker.lorem.word();
  },
  accounts() {
    return faker.lorem.word();
  },
  subjects() {
    return faker.lorem.word();
  },
  destinationIds() {
    return `tag-${faker.random.number(100)}`;
  },
  pddInterval() {
    return faker.lorem.word();
  },
  usageInterval() {
    return faker.lorem.word();
  },
  suppliers() {
    return faker.lorem.word();
  },
  disconnectCauses() {
    return faker.lorem.word();
  },
  mediationRunids() {
    return faker.lorem.word();
  },
  ratedAccounts() {
    return faker.lorem.word();
  },
  ratedSubjects() {
    return faker.lorem.word();
  },
  costInterval() {
    return faker.lorem.word();
  },
  actionTriggers() {
    return `tag-${faker.random.number(100)}`;
  },
  createdAt() {
    return faker.date.past();
  },
});
