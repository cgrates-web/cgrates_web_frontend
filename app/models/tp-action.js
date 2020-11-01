import Model, { attr } from '@ember-data/model';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  tag: [
    validator('presence', true),
    validator('ds-error'),
    validator('length', {
      max: 64,
    }),
  ],
  action: [
    validator('presence', true),
    validator('length', {
      max: 24,
    }),
  ],
  balanceTag: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  balanceType: [
    validator('presence', true),
    validator('length', {
      max: 24,
    }),
  ],
  units: [
    validator('presence', true),
    validator('number', {
      allowString: true,
      gte: 0,
    }),
  ],
  expiryTime: [
    validator('presence', true),
    validator('length', {
      max: 24,
    }),
  ],
  timingTags: [
    validator('presence', true),
    validator('length', {
      max: 128,
    }),
  ],
  destinationTags: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  ratingSubject: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  categories: [
    validator('presence', true),
    validator('length', {
      max: 32,
    }),
  ],
  sharedGroups: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  balanceWeight: [
    validator('presence', true),
    validator('number', {
      allowString: true,
      gte: 0,
    }),
    validator('length', {
      max: 10,
    }),
  ],
  balanceBlocker: [
    validator('presence', true),
    validator('length', {
      max: 5,
    }),
  ],
  balanceDisabled: [
    validator('presence', true),
    validator('length', {
      max: 24,
    }),
  ],
  extraParameters: validator('presence', true),
  filter: validator('presence', true),
  weight: [
    validator('presence', true),
    validator('number', {
      allowString: true,
      gte: 0,
    }),
  ],
});
export default class TpActionModel extends Model.extend(Validations) {
  @attr('string') tpid;
  @attr('string') tag;
  @attr('string') action;
  @attr('string') balanceTag;
  @attr('string') balanceType;
  @attr('string') directions;
  @attr('string') units;
  @attr('string') expiryTime;
  @attr('string') timingTags;
  @attr('string') destinationTags;
  @attr('string') ratingSubject;
  @attr('string') categories;
  @attr('string') sharedGroups;
  @attr('string') balanceWeight;
  @attr('string') balanceBlocker;
  @attr('string') balanceDisabled;
  @attr('string') extraParameters;
  @attr('string') filter;
  @attr('number') weight;
  @attr('date') createdAt;
};
