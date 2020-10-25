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
  filterIds: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  activationInterval: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  usageTtl: [
    validator('presence', true),
    validator('length', {
      max: 32,
    }),
  ],
  limit: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  allocationMessage: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  thresholdIds: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  weight: [
    validator('presence', true),
    validator('number', {
      allowString: true,
      gte: 0,
    }),
  ],
});
export default Model.extend(Validations, {
  tpid: attr('string'),
  tenant: attr('string'),
  customId: attr('string'),
  filterIds: attr('string'),
  activationInterval: attr('string'),
  usageTtl: attr('string'),
  limit: attr('string'),
  allocationMessage: attr('string'),
  blocker: attr('boolean', { defaultValue: false }),
  stored: attr('boolean', { defaultValue: false }),
  weight: attr('number'),
  thresholdIds: attr('string'),
  createdAt: attr('date'),
});
