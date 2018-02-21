import DS from 'ember-data';

export default DS.Model.extend({
  rate:         DS.attr('number'),
  description:  DS.attr('string'),
  supplierName: DS.attr('string'),
  prefix:       DS.attr('string'),
  insertedAt:   DS.attr('date'),

  tariffPlan: DS.belongsTo('tariff-plan')
});
