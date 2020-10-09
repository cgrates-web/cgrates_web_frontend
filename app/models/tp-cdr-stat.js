import Model, { attr } from '@ember-data/model';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  tag: [
    validator('presence', true),
    validator('ds-error'),
    validator('length', {
      max: 64,
    }),
  ],
  queueLength: [
    validator('presence', true),
    validator('number', {
      allowString: true,
      gte: 0,
    }),
  ],
  timeWindow: [
    validator('presence', true),
    validator('length', {
      max: 8,
    }),
  ],
  saveInterval: [
    validator('presence', true),
    validator('length', {
      max: 8,
    }),
  ],
  metrics: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  setupInterval: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  tors: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  cdrHosts: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  cdrSources: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  reqTypes: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  directions: [
    validator('presence', true),
    validator('length', {
      max: 8,
    }),
  ],
  tenants: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  categories: [
    validator('presence', true),
    validator('length', {
      max: 32,
    }),
  ],
  accounts: [
    validator('presence', true),
    validator('length', {
      max: 255,
    }),
  ],
  subjects: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  destinationIds: validator('presence', true),
  pddInterval: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  usageInterval: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  suppliers: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  disconnectCauses: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  mediationRunids: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  ratedAccounts: [
    validator('presence', true),
    validator('length', {
      max: 255,
    }),
  ],
  ratedSubjects: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  costInterval: [
    validator('presence', true),
    validator('length', {
      max: 24,
    }),
  ],
  actionTriggers: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
});
export default Model.extend(Validations, {
  tpid: attr('string'),
  tag: attr('string'),
  queueLength: attr('number'),
  timeWindow: attr('string'),
  saveInterval: attr('string'),
  metrics: attr('string'),
  setupInterval: attr('string'),
  tors: attr('string'),
  cdrHosts: attr('string'),
  cdrSources: attr('string'),
  reqTypes: attr('string'),
  directions: attr('string'),
  tenants: attr('string'),
  categories: attr('string'),
  accounts: attr('string'),
  subjects: attr('string'),
  destinationIds: attr('string'),
  pddInterval: attr('string'),
  usageInterval: attr('string'),
  suppliers: attr('string'),
  disconnectCauses: attr('string'),
  mediationRunids: attr('string'),
  ratedAccounts: attr('string'),
  ratedSubjects: attr('string'),
  costInterval: attr('string'),
  actionTriggers: attr('string'),
  createdAt: attr('date'),
});
