import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';
const Validations = buildValidations({
  loadid: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  direction: [
    validator('presence', true),
    validator('length', {
      max: 8
    }),
  ],
  tenant: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  category: [
    validator('presence', true),
    validator('length', {
      max: 32
    }),
  ],
  subject: [
    validator('presence', true),
    validator('ds-error'),
    validator('length', {
      max: 64
    }),
  ],
  activationTime: [
    validator('presence', true),
    validator('length', {
      max: 24
    }),
  ],
  ratingPlanTag: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  fallbackSubjects: [
    validator('length', {
      max: 64
    }),
  ],
  cdrStatQueueIds: [
    validator('length', {
      max: 64
    }),
  ],
});
export default DS.Model.extend(Validations, {
  tpid:             DS.attr('string'),
  loadid:           DS.attr('string'),
  direction:        DS.attr('string'),
  tenant:           DS.attr('string'),
  category:         DS.attr('string'),
  subject:          DS.attr('string'),
  fallbackSubjects: DS.attr('string'),
  activationTime:   DS.attr('string'),
  cdrStatQueueIds:  DS.attr('string'),
  ratingPlanTag:    DS.attr('string'),
  createdAt:        DS.attr('date')
});
