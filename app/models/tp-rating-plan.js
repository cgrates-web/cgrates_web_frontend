import DS from 'ember-data';

export default DS.Model.extend({
  tpid:         DS.attr('string'),
  tag:          DS.attr('string'),
  destratesTag: DS.attr('string'),
  timingTag:    DS.attr('string'),
  weight:       DS.attr('number'),
  createdAt:    DS.attr('date')
});
