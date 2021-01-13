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
  cgType: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  element: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  values: [
    validator('presence', true),
    validator('length', {
      max: 256,
    }),
  ],
  activationInterval: validator('length', { max: 64 }),
});

export default class TpFilterModel extends Model.extend(Validations) {
  @attr('string') tpid;
  @attr('string') tenant;
  @attr('string') customId;
  @attr('string') activationInterval;
  @attr('date') createdAt;
  @attr('string') cgType;
  @attr('string') element;
  @attr('string') values;
}
