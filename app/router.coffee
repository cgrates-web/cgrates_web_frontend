import Ember from 'ember'
import config from './config/environment'

Router = Ember.Router.extend
  location: config.locationType,
  rootURL: config.rootURL

Router.map ->
  @route 'login'

  @route 'realtime', ->
    @route 'destinations', ->
      @route 'new'
    @route 'accounts', ->
      @route 'new'
      @route 'account', path: ':id', ->
        @route 'add-balance'

  @route 'tariff-plans', ->
    @route 'new'
    @route 'tariff-plan', resetNamespace: true, path: ':tariff_plan_id', ->
      @route 'tp-smart-rates', ->
        @route 'new'
        @route 'csv-import'
      @route 'upload-to-redis'
      @route 'edit'
      @route 'tp-destinations', ->
        @route 'new'
        @route 'tp-destination', path: ':tp_destination_id', ->
          @route 'edit'
      @route 'tp-rates', ->
        @route 'new'
        @route 'tp-rate', path: ':tp_rate_id', ->
          @route 'edit'
      @route 'tp-destination-rates', ->
        @route 'new'
        @route 'tp-destination-rate', path: ':tp_destination_rate_id', ->
          @route 'edit'
      @route 'tp-timings', ->
        @route 'new'
        @route 'tp-timing', path: ':tp_timing_id', ->
          @route 'edit'
      @route 'tp-rating-plans', ->
        @route 'new'
        @route 'tp-rating-plan', path: ':tp_rating_plan_id', ->
          @route 'edit'
      @route 'tp-rating-profiles', ->
        @route 'new'
        @route 'tp-rating-profile', path: ':tp_rating_profile_id', ->
          @route 'edit'
      @route 'tp-actions', ->
        @route 'new'
        @route 'tp-action', path: ':tp_action_id', ->
          @route 'edit'
      @route 'tp-action-plans', ->
        @route 'new'
        @route 'tp-action-plan', path: ':tp_action_plan_id', ->
          @route 'edit'
      @route 'tp-lcr-rules', ->
        @route 'new'
        @route 'tp-lcr-rule', path: ':tp_lcr_rule_id', ->
          @route 'edit'
      @route 'tp-filters', ->
        @route 'new'
        @route 'tp-filter', path: ':tp_filter_id', ->
          @route 'edit'
      @route 'tp-suppliers', ->
        @route 'new'
        @route 'tp-supplier', path: ':tp_supplier_id', ->
          @route 'edit'
  @route 'users', ->
    @route 'new'
    @route 'user', resetNamespace: true, path: ':id', ->
      @route 'edit'

  @route 'cdrs', ->
    @route 'cdr', path: ':id'

export default Router
