import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  prefixes() {
    return [faker.random.number(100), faker.random.number(50)];
  },
});
