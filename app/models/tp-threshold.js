import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  tenant: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  customId: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  filterIds: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  activationInterval: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  maxHits: validator('presence', true),
  minHits: validator('presence', true),
  minSleep: validator('presence', true),
  actionIds: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  weight: [
    validator('presence', true),
    validator('number', {
      allowString: true,
      gte: 0
    }),
  ],
});
export default DS.Model.extend(Validations, {
  tpid:               DS.attr('string'),
  tenant:             DS.attr('string'),
  customId:           DS.attr('string'),
  filterIds:          DS.attr('string'),
  activationInterval: DS.attr('string'),
  maxHits:            DS.attr('number'),
  minHits:            DS.attr('number'),
  minSleep:           DS.attr('number'),
  actionIds:          DS.attr('string'),
  blocker:            DS.attr('boolean', { defaultValue: false }),
  async:              DS.attr('boolean', { defaultValue: false }),
  weight:             DS.attr('number'),
  createdAt:          DS.attr('date'),
});
