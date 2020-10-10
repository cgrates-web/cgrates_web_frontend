import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

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
