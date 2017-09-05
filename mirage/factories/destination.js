import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  prefixes() {
    [faker.random.number(100), faker.random.number(50)];
  }
});
