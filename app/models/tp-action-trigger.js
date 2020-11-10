import Model, { attr } from '@ember-data/model';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  tag: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  uniqueId: [
    validator('presence', true),
    validator('ds-error'),
    validator('length', {
      max: 64,
    }),
  ],
  thresholdType: validator('presence', true),
  thresholdValue: [
    validator('presence', true),
    validator('number', {
      allowString: true,
      gte: 0,
    }),
  ],
  minSleep: [
    validator('presence', true),
    validator('length', {
      max: 16,
    }),
  ],
  expiryTime: [
    validator('presence', true),
    validator('length', {
      max: 24,
    }),
  ],
  activationTime: [
    validator('presence', true),
    validator('length', {
      max: 24,
    }),
  ],
  balanceTag: validator('presence', true),
  balanceType: validator('presence', true),
  balanceCategories: [
    validator('presence', true),
    validator('length', {
      max: 32,
    }),
  ],
  balanceDestinationTags: validator('presence', true),
  balanceRatingSubject: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  balanceSharedGroups: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  balanceExpiryTime: [
    validator('presence', true),
    validator('length', {
      max: 24,
    }),
  ],
  balanceTimingTags: [
    validator('presence', true),
    validator('length', {
      max: 128,
    }),
  ],
  balanceWeight: [
    validator('presence', true),
    validator('length', {
      max: 10,
    }),
  ],
  balanceBlocker: validator('presence', true),
  balanceDisabled: validator('presence', true),
  actionsTag: validator('presence', true),
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
  tag: attr('string'),
  uniqueId: attr('string'),
  thresholdType: attr('string'),
  thresholdValue: attr('number'),
  recurrent: attr('boolean', { defaultValue: false }),
  minSleep: attr('string'),
  expiryTime: attr('string'),
  activationTime: attr('string'),
  balanceTag: attr('string'),
  balanceType: attr('string'),
  balanceCategories: attr('string'),
  balanceDestinationTags: attr('string'),
  balanceRatingSubject: attr('string'),
  balanceSharedGroups: attr('string'),
  balanceExpiryTime: attr('string'),
  balanceTimingTags: attr('string'),
  balanceWeight: attr('string'),
  balanceBlocker: attr('boolean', { defaultValue: false }),
  balanceDisabled: attr('boolean', { defaultValue: false }),
  actionsTag: attr('string'),
  weight: attr('number'),
  createdAt: attr('date'),
});
