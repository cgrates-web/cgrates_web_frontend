import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  tag: [
    validator('presence', true),
    validator('ds-error'),
    validator('length', {
      max: 64
    }),
  ],
  queueLength: [
    validator('presence', true),
    validator('number', {
      allowString: true,
      gte: 0
    }),
  ],
  timeWindow: [
    validator('presence', true),
    validator('length', {
      max: 8
    }),
  ],
  saveInterval: [
    validator('presence', true),
    validator('length', {
      max: 8
    }),
  ],
  metrics: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  setupInterval: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  tors: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  cdrHosts: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  cdrSources: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  reqTypes: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  directions: [
    validator('presence', true),
    validator('length', {
      max: 8
    }),
  ],
  tenants: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  categories: [
    validator('presence', true),
    validator('length', {
      max: 32
    }),
  ],
  accounts: [
    validator('presence', true),
    validator('length', {
      max: 255
    }),
  ],
  subjects: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  destinationIds: validator('presence', true),
  pddInterval: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  usageInterval: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  suppliers: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  disconnectCauses: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  mediationRunids: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  ratedAccounts: [
    validator('presence', true),
    validator('length', {
      max: 255
    }),
  ],
  ratedSubjects: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  costInterval: [
    validator('presence', true),
    validator('length', {
      max: 24
    }),
  ],
  actionTriggers: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
});
export default DS.Model.extend(Validations, {
  tpid:              DS.attr('string'),
  tag:               DS.attr('string'),
  queueLength:       DS.attr('number'),
  timeWindow:        DS.attr('string'),
  saveInterval:      DS.attr('string'),
  metrics:           DS.attr('string'),
  setupInterval:     DS.attr('string'),
  tors:              DS.attr('string'),
  cdrHosts:          DS.attr('string'),
  cdrSources:        DS.attr('string'),
  reqTypes:          DS.attr('string'),
  directions:        DS.attr('string'),
  tenants:           DS.attr('string'),
  categories:        DS.attr('string'),
  accounts:          DS.attr('string'),
  subjects:          DS.attr('string'),
  destinationIds:    DS.attr('string'),
  pddInterval:       DS.attr('string'),
  usageInterval:     DS.attr('string'),
  suppliers:         DS.attr('string'),
  disconnectCauses:  DS.attr('string'),
  mediationRunids:   DS.attr('string'),
  ratedAccounts:     DS.attr('string'),
  ratedSubjects:     DS.attr('string'),
  costInterval:      DS.attr('string'),
  actionTriggers:    DS.attr('string'),
  createdAt:         DS.attr('date'),
});
