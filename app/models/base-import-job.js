import DS from 'ember-data';

export default DS.Model.extend({
  tpid: DS.attr('string'),
  csv:  DS.attr()
});
