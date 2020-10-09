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
  maxHits: [
    validator('presence', true),
    validator('number', {
      allowString: true,
      gte: 0,
    }),
  ],
  minHits: [
    validator('presence', true),
    validator('number', {
      allowString: true,
      gte: 0,
    }),
  ],
  minSleep: [
    validator('presence', true),
    validator('number', {
      allowString: true,
      gte: 0,
    }),
  ],
  actionIds: [
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
  maxHits: attr('number'),
  minHits: attr('number'),
  minSleep: attr('number'),
  actionIds: attr('string'),
  blocker: attr('boolean', { defaultValue: false }),
  async: attr('boolean', { defaultValue: false }),
  weight: attr('number'),
  createdAt: attr('date'),
});
