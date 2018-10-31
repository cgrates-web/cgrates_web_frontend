import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  tag: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  uniqueId: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  thresholdType: validator('presence', true),
  thresholdValue: [
    validator('presence', true),
    validator('number', {
      allowString: true,
      gte: 0
    }),
  ],
  minSleep: [
    validator('presence', true),
    validator('length', {
      max: 16
    }),
  ],
  expiryTime: [
    validator('presence', true),
    validator('length', {
      max: 24
    }),
  ],
  activationTime: [
    validator('presence', true),
    validator('length', {
      max: 24
    }),
  ],
  balanceTag:        validator('presence', true),
  balanceType:       validator('presence', true),
  balanceDirections: validator('presence', true),
  balanceCategories: [
    validator('presence', true),
    validator('length', {
      max: 32
    }),
  ],
  balanceDestinationTags: validator('presence', true),
  balanceRatingSubject: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  balanceSharedGroups: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  balanceExpiryTime: [
    validator('presence', true),
    validator('length', {
      max: 24
    }),
  ],
  balanceTimingTags: [
    validator('presence', true),
    validator('length', {
      max: 128
    }),
  ],
  balanceWeight: [
    validator('presence', true),
    validator('length', {
      max: 10
    }),
  ],
  balanceBlocker:  validator('presence', true),
  balanceDisabled: validator('presence', true),
  minQueuedItems: [
    validator('presence', true),
    validator('number', {
      allowString: true,
      gte: 0
    }),
  ],
  actionsTag: validator('presence', true),
  weight: [
    validator('presence', true),
    validator('number', {
      allowString: true,
      gte: 0
    }),
  ],
});
export default DS.Model.extend(Validations, {
  tpid:                       DS.attr('string'),
  tag:                        DS.attr('string'),
  uniqueId:                   DS.attr('string'),
  thresholdType:              DS.attr('string'),
  thresholdValue:             DS.attr('number'),
  recurrent:                  DS.attr('boolean'),
  minSleep:                   DS.attr('string'),
  expiryTime:                 DS.attr('string'),
  activationTime:             DS.attr('string'),
  balanceTag:                 DS.attr('string'),
  balanceType:                DS.attr('string'),
  balanceDirections:          DS.attr('string'),
  balanceCategories:          DS.attr('string'),
  balanceDestinationTags:     DS.attr('string'),
  balanceRatingSubject:       DS.attr('string'),
  balanceSharedGroups:        DS.attr('string'),
  balanceExpiryTime:          DS.attr('string'),
  balanceTimingTags:          DS.attr('string'),
  balanceWeight:              DS.attr('string'),
  balanceBlocker:             DS.attr('string'),
  balanceDisabled:            DS.attr('string'),
  minQueuedItems:             DS.attr('number'),
  actionsTag:                 DS.attr('string'),
  weight:                     DS.attr('number'),
  createdAt:                  DS.attr('date'),
});
