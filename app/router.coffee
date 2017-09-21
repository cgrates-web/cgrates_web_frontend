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
      @route 'destination', ->
        @route 'edit'

  @route 'tariff-plans', ->
    @route 'new'
    @route 'tariff-plan', resetNamespace: true, path: ':id', ->
      @route 'edit'

  @route 'users', ->
    @route 'new'
    @route 'user', resetNamespace: true, path: ':id', ->
      @route 'edit'

export default Router
