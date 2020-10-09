import Model, { attr } from '@ember-data/model';
import { validator, buildValidations } from 'ember-cp-validations';
const Validations = buildValidations({
  loadid: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  direction: [
    validator('presence', true),
    validator('length', {
      max: 8,
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
  cdrStatQueueIds: [
    validator('length', {
      max: 64,
    }),
  ],
});
export default Model.extend(Validations, {
  tpid: attr('string'),
  loadid: attr('string'),
  direction: attr('string'),
  tenant: attr('string'),
  category: attr('string'),
  subject: attr('string'),
  fallbackSubjects: attr('string'),
  activationTime: attr('string'),
  cdrStatQueueIds: attr('string'),
  ratingPlanTag: attr('string'),
  createdAt: attr('date'),
});
