import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  tpid() {
    'tptest';
  },
  loadid() {
    faker.lorem.word();
  },
  tenant() {
    faker.lorem.word();
  },
  category() {
    faker.lorem.word();
  },
  subject() {
    faker.lorem.word();
  },
  fallback_subjects() {
    faker.lorem.word();
  },
  activation_time() {
    faker.date.future();
  },
  rating_plan_tag() {
    'ratingplantest';
  },
});
