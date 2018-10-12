import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';
const Validations = buildValidations({
  tag: [
    validator('presence', true),
    validator('ds-error'),
    validator('length', {
      max: 64
    }),
  ],
  action: [
    validator('presence', true),
    validator('length', {
      max: 24
    }),
  ],
  balanceTag: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  balanceType: [
    validator('presence', true),
    validator('length', {
      max: 24
    }),
  ],
  directions: [
    validator('presence', true),
    validator('length', {
      max: 8
    }),
  ],
  units: [
    validator('presence', true),
    validator('number', {
      allowString: true,
      gte: 0
    }),
  ],
  expiryTime: [
    validator('presence', true),
    validator('length', {
      max: 24
    }),
  ],
  timingTags: [
    validator('presence', true),
    validator('length', {
      max: 128
    }),
  ],
  destinationTags: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  ratingSubject: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  categories: [
    validator('presence', true),
    validator('length', {
      max: 32
    }),
  ],
  sharedGroups: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  balanceWeight: [
    validator('presence', true),
    validator('number', {
      allowString: true,
      gte: 0
    }),
    validator('length', {
      max: 10
    }),
  ],
  balanceBlocker: [
    validator('presence', true),
    validator('length', {
      max: 5
    }),
  ],
  balanceDisabled: [
    validator('presence', true),
    validator('length', {
      max: 24
    }),
  ],
  extraParameters: validator('presence', true),
  filter: validator('presence', true),
  weight: [
    validator('presence', true),
    validator('number', {
      allowString: true,
      gte: 0
    }),
  ],
});
export default DS.Model.extend(Validations, {
  tpid:            DS.attr('string'),
  tag:             DS.attr('string'),
  action:          DS.attr('string'),
  balanceTag:      DS.attr('string'),
  balanceType:     DS.attr('string'),
  directions:      DS.attr('string'),
  units:           DS.attr('string'),
  expiryTime:      DS.attr('string'),
  timingTags:      DS.attr('string'),
  destinationTags: DS.attr('string'),
  ratingSubject:   DS.attr('string'),
  categories:      DS.attr('string'),
  sharedGroups:    DS.attr('string'),
  balanceWeight:   DS.attr('string'),
  balanceBlocker:  DS.attr('string'),
  balanceDisabled: DS.attr('string'),
  extraParameters: DS.attr('string'),
  filter:          DS.attr('string'),
  weight:          DS.attr('number'),
  createdAt:       DS.attr('date')
});
