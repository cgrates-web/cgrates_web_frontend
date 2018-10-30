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
  runId: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  attributeIds: [
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
  tpid:                 DS.attr('string'),
  tenant:               DS.attr('string'),
  customId:             DS.attr('string'),
  filterIds:            DS.attr('string'),
  activationInterval:   DS.attr('string'),
  runId:                DS.attr('string'),
  attributeIds:         DS.attr('string'),
  weight:               DS.attr('number'),
  createdAt:            DS.attr('date'),
});
