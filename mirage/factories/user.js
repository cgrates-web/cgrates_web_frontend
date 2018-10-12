import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  email() { return faker.internet.email(); }
});
