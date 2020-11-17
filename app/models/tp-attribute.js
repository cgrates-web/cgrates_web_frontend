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
  contexts: [
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
  weight: [
    validator('presence', true),
    validator('number', {
      allowString: true,
      gte: 0,
    }),
  ],
  path: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  type: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  value: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
});
export default Model.extend(Validations, {
  tpid: attr('string'),
  tenant: attr('string'),
  customId: attr('string'),
  contexts: attr('string'),
  filterIds: attr('string'),
  activationInterval: attr('string'),
  blocker: attr('boolean', { defaultValue: false }),
  weight: attr('number'),
  createdAt: attr('date'),
  path: attr('string'),
  type: attr('string'),
  value: attr('string'),
});
