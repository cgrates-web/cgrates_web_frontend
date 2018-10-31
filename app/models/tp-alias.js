import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  tenant: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  direction: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  category: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  account: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  subject: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  destinationId: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  context: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  target: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  original: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  alias: [
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
  direction:            DS.attr('string'),
  category:             DS.attr('string'),
  account:              DS.attr('string'),
  subject:              DS.attr('string'),
  destinationId:        DS.attr('string'),
  context:              DS.attr('string'),
  target:               DS.attr('string'),
  original:             DS.attr('string'),
  alias:                DS.attr('string'),
  weight:               DS.attr('number'),
  createdAt:            DS.attr('date'),
});
