import Model, { attr } from '@ember-data/model';
import { validator, buildValidations } from 'ember-cp-validations';
const Validations = buildValidations({
  loadid: [
    validator('length', {
      max: 64,
    }),
  ],
  tenant: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  category: [
    validator('presence', true),
    validator('length', {
      max: 32,
    }),
  ],
  subject: [
    validator('presence', true),
    validator('ds-error'),
    validator('length', {
      max: 64,
    }),
  ],
  activationTime: [
    validator('presence', true),
    validator('length', {
      max: 24,
    }),
  ],
  ratingPlanTag: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  fallbackSubjects: [
    validator('length', {
      max: 64,
    }),
  ],
});
export default class TpRatingProfileModel extends Model.extend(Validations) {
  @attr('string') tpid;
  @attr('string', { defaultValue: '' }) loadid;
  @attr('string') tenant;
  @attr('string') category;
  @attr('string') subject;
  @attr('string') fallbackSubjects;
  @attr('string') activationTime;
  @attr('string') ratingPlanTag;
  @attr('date', {
    defaultValue() {
      return new Date();
    },
  })
  createdAt;
}
