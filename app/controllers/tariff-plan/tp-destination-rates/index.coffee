import Ember from 'ember'
import QueryControllerMixin from 'cgrates-web-frontend/mixins/query-controller-mixin'

export default Ember.Controller.extend QueryControllerMixin,
  queryParams: ['tag', 'roundingMethod', 'roundingDecimals', 'ratesTag', 'maxCostStrategy',
                'maxCost', 'destinationsTag', 'sortColumn', 'sortOrder', 'page', 'pageSize']

  tag:              null
  roundingMethod:   null
  roundingDecimals: null
  ratesTag:         null
  maxCostStrategy:  null
  maxCost:          null
  destinationsTag:  null

  roundingMethodList:  ['*up', '*down', '*middle']
  maxCostStrategyList: ['*free', '*disconnect']
