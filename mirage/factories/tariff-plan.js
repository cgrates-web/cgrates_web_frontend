import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name() { faker.commerce.productName() },
  alias() { faker.company.companyName() },
  description() { faker.lorem.line }
});
