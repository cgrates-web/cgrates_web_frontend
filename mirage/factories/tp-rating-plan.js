import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  tpid()          { 'tptest'; },
  tag()           { faker.lorem.word(); },
  destrates_tag() { 'destratetest'; },
  timing_tag()    { 'timingtest'; },
  weight()        { faker.random.number(1000) / 10; },
});
