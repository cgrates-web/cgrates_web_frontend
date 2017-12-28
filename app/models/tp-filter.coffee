import DS from 'ember-data'

export default DS.Model.extend {
  tpid:               DS.attr 'string'
  tenant:             DS.attr 'string'
  id:                 DS.attr 'string'
  filterType:         DS.attr 'string'
  filterFieldName:    DS.attr 'string'
  filterFieldValues:  DS.attr 'string'
  activationInterval: DS.attr 'string'
  createdAt:          DS.attr 'date'
}
