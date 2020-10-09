import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name() {
    return faker.name.firstName();
  },
  alias() {
    return faker.company.companyName();
  },
  description() {
    return faker.lorem.words();
  },
});
