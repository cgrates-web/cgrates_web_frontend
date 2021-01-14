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
    validator('length', {
      max: 64,
    }),
  ],
  balanceType: [
    validator('length', {
      max: 24,
    }),
  ],
  units: [
    validator('number', {
      allowString: true,
      allowBlank: true,
      gte: 0,
    }),
  ],
  expiryTime: [
    validator('length', {
      max: 24,
    }),
  ],
  timingTags: [
    validator('length', {
      max: 128,
    }),
  ],
  destinationTags: [
    validator('length', {
      max: 64,
    }),
  ],
  ratingSubject: [
    validator('length', {
      max: 64,
    }),
  ],
  categories: [
    validator('length', {
      max: 32,
    }),
  ],
  sharedGroups: [
    validator('length', {
      max: 64,
    }),
  ],
  balanceWeight: [
    validator('number', {
      allowString: true,
      allowBlank: true,
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
  @attr('string', { defaultValue: '' }) balanceTag;
  @attr('string', { defaultValue: '' }) balanceType;
  @attr('string', { defaultValue: '' }) directions;
  @attr('string', { defaultValue: '' }) units;
  @attr('string', { defaultValue: '' }) expiryTime;
  @attr('string', { defaultValue: '' }) timingTags;
  @attr('string', { defaultValue: '' }) destinationTags;
  @attr('string', { defaultValue: '' }) ratingSubject;
  @attr('string', { defaultValue: '' }) categories;
  @attr('string', { defaultValue: '' }) sharedGroups;
  @attr('string', { defaultValue: '' }) balanceWeight;
  @attr('string') balanceBlocker;
  @attr('string') balanceDisabled;
  @attr('string', { defaultValue: '' }) extraParameters;
  @attr('string', { defaultValue: '' }) filter;
  @attr('number', { defaultValue: '' }) weight;
  @attr('date', {
    defaultValue() {
      return new Date();
    },
  })
  createdAt;
}
