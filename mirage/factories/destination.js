import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  prefixes() {
    return [faker.random.number(100), faker.random.number(50)];
  },
});
