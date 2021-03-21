import { Factory, association } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  email() {
    return faker.internet.email();
  },

  tenant: association(),
});
