import DS from 'ember-data';

export default DS.Model.extend({
  tpid:           DS.attr('string'),
  direction:      DS.attr('string'),
  tenant:         DS.attr('string'),
  category:       DS.attr('string'),
  account:        DS.attr('string'),
  subject:        DS.attr('string'),
  destinationTag: DS.attr('string'),
  rpCategory:     DS.attr('string'),
  strategy:       DS.attr('string'),
  strategyParams: DS.attr('string', {defaultValue: ''}),
  activationTime: DS.attr('string'),
  weight:         DS.attr('number'),
  createdAt:      DS.attr('date')
});
