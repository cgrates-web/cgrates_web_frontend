import Ember from 'ember'

export default Ember.Controller.extend
  queryParams:     ['page', 'pageSize']
  accountsSorting: ['id']

  page:     1
  pageSize: 10

  sortedAccounts: Ember.computed.sort('model', 'accountsSorting'),

  totalPages: Ember.computed 'page', ->
    @get('page') + 1

  actions:
    remove: (account) -> account.destroyRecord()
