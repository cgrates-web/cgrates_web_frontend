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
  routeId: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  routeWeight: [
    validator('presence', true),
    validator('number', {
      allowString: true,
      gte: 0,
    }),
  ],
  weight: [
    validator('presence', true),
    validator('number', {
      allowString: true,
      gte: 0,
    }),
  ]
});
export default class TpRouteModel extends Model.extend(Validations) {
  @attr('string', { defaultValue: ''}) customId;
  @attr('string', { defaultValue: ''}) routeId;
  @attr('string', { defaultValue: ''}) tpid;
  @attr('number') routeWeight;
  @attr('string', { defaultValue: ''}) tenant;
  @attr('string', { defaultValue: ''}) sorting;
  @attr('string', { defaultValue: ''}) sortingParameters;
  @attr('string', { defaultValue: ''}) filterIds;
  @attr('string', { defaultValue: ''}) activationInterval;
  @attr('string', { defaultValue: ''}) routeFilterIds;
  @attr('string', { defaultValue: ''}) routeAccountIds;
  @attr('string', { defaultValue: ''}) routeRatingplanIds;
  @attr('string', { defaultValue: ''}) routeResourceIds;
  @attr('string', { defaultValue: ''}) routeStatIds;
  @attr('boolean', { defaultValue: false }) routeBlocker;
  @attr('string', { defaultValue: ''}) routeParameters;
  @attr('number') weight;
  @attr('date', { defaultValue: () => new Date()}) createdAt;
};
