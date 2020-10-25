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
  runId: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  attributeIds: [
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
  runId: attr('string'),
  attributeIds: attr('string'),
  weight: attr('number'),
  createdAt: attr('date'),
});
