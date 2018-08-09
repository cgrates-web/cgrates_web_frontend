import DS from 'ember-data';

export default DS.Model.extend({
  tpid:             DS.attr('string'),
  tag:              DS.attr('string'),
  roundingMethod:   DS.attr('string'),
  roundingDecimals: DS.attr('number'),
  ratesTag:         DS.attr('string'),
  maxCostStrategy:  DS.attr('string'),
  maxCost:          DS.attr('number'),
  destinationsTag:  DS.attr('string'),
  createdAt:        DS.attr('date')
});
