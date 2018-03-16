import DS from 'ember-data';

export default DS.Model.extend({
  tpid: DS.attr('string'),
  tenant: DS.attr('string'),
  customId: DS.attr('string', {defaultValue: ''}),
  filterIds: DS.attr('string', {defaultValue: ''}),
  activationInterval: DS.attr('string', {defaultValue: ''}),
  sorting: DS.attr('string', {defaultValue: ''}),
  sortingParams: DS.attr('string', {defaultValue: ''}),
  supplierId: DS.attr('string', {defaultValue: ''}),
  supplierFilterIds: DS.attr('string', {defaultValue: ''}),
  supplierAccountIds: DS.attr('string', {defaultValue: ''}),
  supplierRatingplanIds: DS.attr('string', {defaultValue: ''}),
  supplierResourceIds: DS.attr('string', {defaultValue: ''}),
  supplierStatIds: DS.attr('string', {defaultValue: ''}),
  supplierBlocker: DS.attr('boolean', {defaultValue: false}),
  supplierWeight: DS.attr('number'),
  weight: DS.attr('number'),
  createdAt: DS.attr('date')
});