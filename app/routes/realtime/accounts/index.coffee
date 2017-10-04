import Ember from 'ember'

export default Ember.Route.extend
  queryParams:
    page:
      refreshModel: true
    pageSize:
      refreshModel: true

  model: (params) ->
    @store.query 'account', page: params.page, per_page: params.pageSize
