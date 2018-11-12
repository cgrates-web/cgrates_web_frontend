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
  account: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  subject: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  destinationIds: [
    validator('presence', true),
    validator('ds-error'),
  ],
  runid: [
    validator('presence', true),
    validator('ds-error'),
    validator('length', {
      max: 24
    }),
  ],
  runFilters: [
    validator('presence', true),
    validator('length', {
      max: 256
    }),
  ],
  reqTypeField: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  directionField: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  tenantField: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  categoryField: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  accountField: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  subjectField: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  destinationField: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  setupTimeField: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  pddField: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  answerTimeField: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  usageField: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  supplierField: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  disconnectCauseField: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  ratedField: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  costField: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
});
export default DS.Model.extend(Validations, {
  tpid:                   DS.attr('string'),
  loadid:                 DS.attr('string'),
  direction:              DS.attr('string'),
  tenant:                 DS.attr('string'),
  category:               DS.attr('string'),
  account:                DS.attr('string'),
  subject:                DS.attr('string'),
  destinationIds:         DS.attr('string'),
  runid:                  DS.attr('string'),
  runFilters:             DS.attr('string'),
  reqTypeField:           DS.attr('string'),
  directionField:         DS.attr('string'),
  tenantField:            DS.attr('string'),
  categoryField:          DS.attr('string'),
  accountField:           DS.attr('string'),
  subjectField:           DS.attr('string'),
  destinationField:       DS.attr('string'),
  setupTimeField:         DS.attr('string'),
  pddField:               DS.attr('string'),
  answerTimeField:        DS.attr('string'),
  usageField:             DS.attr('string'),
  supplierField:          DS.attr('string'),
  disconnectCauseField:   DS.attr('string'),
  ratedField:             DS.attr('string'),
  costField:              DS.attr('string'),
  createdAt:              DS.attr('date'),
});
