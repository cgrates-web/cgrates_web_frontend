import Model, { attr } from '@ember-data/model';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  tenant: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  customId: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  filterIds: validator('length', {
    max: 64,
  }),
  activationInterval: validator('length', {
    max: 64,
  }),
  sorting: validator('length', {
    max: 32,
  }),

  sortingParameters: validator('length', {
    max: 64,
  }),
  supplierId: [
    validator('presence', true),
    validator('length', {
      max: 32,
    }),
  ],
  supplierFilterIds: validator('length', {
    max: 64,
  }),
  supplierAccountIds: validator('length', {
    max: 64,
  }),
  supplierRatingplanIds: validator('length', {
    max: 64,
  }),
  supplierResourceIds: validator('length', {
    max: 64,
  }),
  supplierStatIds: validator('length', {
    max: 64,
  }),
  weight: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  supplierWeight: validator('presence', true),
  supplierBlocker: validator('presence', true),
});
export default Model.extend(Validations, {
  tpid: attr('string'),
  tenant: attr('string'),
  customId: attr('string', { defaultValue: '' }),
  filterIds: attr('string', { defaultValue: '' }),
  activationInterval: attr('string', { defaultValue: '' }),
  sorting: attr('string', { defaultValue: '' }),
  sortingParameters: attr('string', { defaultValue: '' }),
  supplierId: attr('string', { defaultValue: '' }),
  supplierFilterIds: attr('string', { defaultValue: '' }),
  supplierAccountIds: attr('string', { defaultValue: '' }),
  supplierRatingplanIds: attr('string', { defaultValue: '' }),
  supplierResourceIds: attr('string', { defaultValue: '' }),
  supplierStatIds: attr('string', { defaultValue: '' }),
  supplierBlocker: attr('boolean', { defaultValue: false }),
  supplierWeight: attr('number'),
  weight: attr('number'),
  createdAt: attr('date'),
});
