import Model, { attr } from '@ember-data/model';

export default Model.extend({
  tpid: attr('string'),
  csv: attr(),
});
