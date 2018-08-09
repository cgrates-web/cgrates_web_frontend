import DS from 'ember-data';

export default DS.Model.extend({
  tpid:      DS.attr('string'),
  tag:       DS.attr('string'),
  years:     DS.attr('string'),
  months:    DS.attr('string'),
  monthDays: DS.attr('string'),
  weekDays:  DS.attr('string'),
  time:      DS.attr('string'),
  createdAt: DS.attr('date')
});
