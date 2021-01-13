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
  contexts: [
    validator('length', {
      max: 64,
    }),
  ],
  filterIds: [
    validator('length', {
      max: 64,
    }),
  ],
  activationInterval: [
    validator('length', {
      max: 64,
    }),
  ],
  weight: [
    validator('number', {
      allowString: true,
      gte: 0,
    }),
  ],
  path: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  cgType: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  value: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
});

export default class TpAttributeModel extends Model.extend(Validations) {
  @attr('string') tpid;
  @attr('string') tenant;
  @attr('string') customId;
  @attr('string', { defaultValue: '' }) contexts;
  @attr('string', { defaultValue: '' }) filterIds;
  @attr('string', { defaultValue: '' }) activationInterval;
  @attr('boolean', { defaultValue: false }) blocker;
  @attr('number', { defaultValue: 0 }) weight;
  @attr('date') createdAt;
  @attr('string') path;
  @attr('string') cgType;
  @attr('string') value;
  @attr('string', { defaultValue: '' }) attributeFilterIds;
}
