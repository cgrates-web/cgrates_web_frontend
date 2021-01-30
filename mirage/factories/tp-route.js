import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  tpid: 'tptest',
  customId: faker.vehicle.model,
  routeId: faker.address.direction,
  tenant: faker.vehicle.manufacturer,
  weight() {
    return faker.random.number({ min: 0 });
  },
  routeWeight() {
    return faker.random.number({ min: 0 });
  },
});
