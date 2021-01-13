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
    validator('length', {
      max: 64,
    }),
  ],
  activationInterval: [
    validator('length', {
      max: 64,
    }),
  ],
  runId: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  attributeIds: [
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

export default class TpChargerModel extends Model.extend(Validations) {
  @attr('string') tpid;
  @attr('string') tenant;
  @attr('string') customId;
  @attr('string', { defaultValue: '' }) filterIds;
  @attr('string', { defaultValue: '' }) activationInterval;
  @attr('string') runId;
  @attr('string', { defaultValue: '' }) attributeIds;
  @attr('number') weight;
  @attr('date') createdAt;
}
