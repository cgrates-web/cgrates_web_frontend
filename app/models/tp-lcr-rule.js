import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';
const Validations = buildValidations({
  direction: [
    validator('presence', true),
    validator('ds-error'),
    validator('length', {
      max: 8
    }),
  ],
  tenant: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  category: [
    validator('presence', true),
    validator('length', {
      max: 32
    }),
  ],
  account: [
    validator('presence', true),
    validator('length', {
      max: 24
    }),
  ],
  subject: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  destinationTag: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  rpCategory: [
    validator('presence', true),
    validator('length', {
      max: 32
    }),
  ],
  strategy: [
    validator('presence', true),
    validator('ds-error'),
    validator('length', {
      max: 18
    }),
  ],
  strategyParams: validator('length', { max: 256 }),
  activationTime: [
    validator('presence', true),
    validator('length', {
      max: 24
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
  tpid:           DS.attr('string'),
  direction:      DS.attr('string'),
  tenant:         DS.attr('string'),
  category:       DS.attr('string'),
  account:        DS.attr('string'),
  subject:        DS.attr('string'),
  destinationTag: DS.attr('string'),
  rpCategory:     DS.attr('string'),
  strategy:       DS.attr('string'),
  strategyParams: DS.attr('string', {defaultValue: ''}),
  activationTime: DS.attr('string'),
  weight:         DS.attr('number'),
  createdAt:      DS.attr('date')
});
