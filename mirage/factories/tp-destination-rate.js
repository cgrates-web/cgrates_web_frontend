import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  tpid:               'tptest',
  tag()               { return faker.lorem.word(); },
  rounding_method:     '*up',
  rounding_decimals:   1 ,
  rates_tag:          'ratetest',
  max_cost_strategy:  '*free',
  max_cost()          { return faker.random.number(1000) / 10; },
  destinations_tag:   'destinationtest'
});
