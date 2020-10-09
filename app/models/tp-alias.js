import Model, { attr } from '@ember-data/model';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  tenant: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  direction: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  category: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  account: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  subject: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  destinationId: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  context: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  target: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  original: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  alias: [
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
  direction: attr('string'),
  category: attr('string'),
  account: attr('string'),
  subject: attr('string'),
  destinationId: attr('string'),
  context: attr('string'),
  target: attr('string'),
  original: attr('string'),
  alias: attr('string'),
  weight: attr('number'),
  createdAt: attr('date'),
});
