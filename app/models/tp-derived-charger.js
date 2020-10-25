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
  account: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  subject: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  destinationIds: [validator('presence', true), validator('ds-error')],
  runid: [
    validator('presence', true),
    validator('ds-error'),
    validator('length', {
      max: 24,
    }),
  ],
  runFilters: [
    validator('presence', true),
    validator('length', {
      max: 256,
    }),
  ],
  reqTypeField: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  directionField: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  tenantField: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  categoryField: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  accountField: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  subjectField: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  destinationField: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  setupTimeField: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  pddField: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  answerTimeField: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  usageField: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  supplierField: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  disconnectCauseField: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  ratedField: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  costField: [
    validator('presence', true),
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
  account: attr('string'),
  subject: attr('string'),
  destinationIds: attr('string'),
  runid: attr('string'),
  runFilters: attr('string'),
  reqTypeField: attr('string'),
  directionField: attr('string'),
  tenantField: attr('string'),
  categoryField: attr('string'),
  accountField: attr('string'),
  subjectField: attr('string'),
  destinationField: attr('string'),
  setupTimeField: attr('string'),
  pddField: attr('string'),
  answerTimeField: attr('string'),
  usageField: attr('string'),
  supplierField: attr('string'),
  disconnectCauseField: attr('string'),
  ratedField: attr('string'),
  costField: attr('string'),
  createdAt: attr('date'),
});
