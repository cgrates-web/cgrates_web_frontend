import DS from 'ember-data';

export default DS.Model.extend({
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
