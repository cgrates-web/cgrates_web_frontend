import DS from 'ember-data';

export default DS.Model.extend({
  tpid:               DS.attr('string'),
  tag:                DS.attr('string'),
  rateUnit:           DS.attr('string'),
  rateIncrement:      DS.attr('string'),
  rate:               DS.attr('number'),
  groupIntervalStart: DS.attr('string'),
  connectFee:         DS.attr('number'),
  createdAt:          DS.attr('date')
});
