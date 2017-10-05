import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  tpid()               { 'tptest' },
  loadid()             { faker.lorem.word() },
  direction()          { 'IN' },
  tenant()             { faker.lorem.word() },
  category()           { faker.lorem.word() },
  subject()            { faker.lorem.word() },
  fallback_subjects()  { faker.lorem.word() },
  activation_time()    { faker.date.future() },
  cdr_stat_queue_ids() { faker.lorem.word() },
  rating_plan_tag()    { 'ratingplantest' }
});
