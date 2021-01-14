import Model, { attr } from '@ember-data/model';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  tenant: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  customId: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  filterIds: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  activationInterval: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  usageTtl: [
    validator('presence', true),
    validator('length', {
      max: 32,
    }),
  ],
  limit: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  allocationMessage: [
    validator('length', {
      max: 64,
    }),
  ],
  thresholdIds: [
    validator('presence', true),
    validator('length', {
      max: 64,
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

export default class TpResourceModel extends Model.extend(Validations) {
  @attr('string') tpid;
  @attr('string') tenant;
  @attr('string') customId;
  @attr('string') filterIds;
  @attr('string') activationInterval;
  @attr('string') usageTtl;
  @attr('string') limit;
  @attr('string', { defaultValue: '' }) allocationMessage;
  @attr('string', { defaultValue: '' }) blocker;
  @attr('string', { defaultValue: '' }) stored;
  @attr('number') weight;
  @attr('string', { defaultValue: '*none' }) thresholdIds;
  @attr('date', {
    defaultValue() {
      return new Date();
    },
  })
  createdAt;
}
