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
  usageTtl: [
    validator('presence', true),
    validator('length', {
      max: 32
    }),
  ],
  limit: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  allocationMessage: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  thresholdIds: [
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
  usageTtl:           DS.attr('string'),
  limit:              DS.attr('string'),
  allocationMessage:  DS.attr('string'),
  blocker:            DS.attr('boolean', { defaultValue: false }),
  stored:             DS.attr('boolean', { defaultValue: false }),
  weight:             DS.attr('number'),
  thresholdIds:       DS.attr('string'),
  createdAt:          DS.attr('date'),
});
