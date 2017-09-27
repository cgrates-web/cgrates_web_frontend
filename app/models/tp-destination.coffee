import DS from 'ember-data'

export default DS.Model.extend {
  tpid:      DS.attr 'string'
  tag:       DS.attr 'string'
  prefix:    DS.attr 'string'
  createdAt: DS.attr 'date'
}
