import Model, { attr } from '@ember-data/model';
import { validator, buildValidations } from 'ember-cp-validations';
const Validations = buildValidations({
  direction: [
    validator('presence', true),
    validator('ds-error'),
    validator('length', {
      max: 8,
    }),
  ],
  tenant: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  category: [
    validator('presence', true),
    validator('length', {
      max: 32,
    }),
  ],
  account: [
    validator('presence', true),
    validator('length', {
      max: 24,
    }),
  ],
  subject: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  destinationTag: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  rpCategory: [
    validator('presence', true),
    validator('length', {
      max: 32,
    }),
  ],
  strategy: [
    validator('presence', true),
    validator('ds-error'),
    validator('length', {
      max: 18,
    }),
  ],
  strategyParams: validator('length', { max: 256 }),
  activationTime: [
    validator('presence', true),
    validator('length', {
      max: 24,
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
  direction: attr('string'),
  tenant: attr('string'),
  category: attr('string'),
  account: attr('string'),
  subject: attr('string'),
  destinationTag: attr('string'),
  rpCategory: attr('string'),
  strategy: attr('string'),
  strategyParams: attr('string', { defaultValue: '' }),
  activationTime: attr('string'),
  weight: attr('number'),
  createdAt: attr('date'),
});
