# jshint expr:true
import Ember from 'ember'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'

describe "Acceptance: TpDestination.Index", ->
  beforeEach ->
    @App = startApp()
    @tariffPlan = server.create 'tariff-plan', name: 'Test', alias: 'tptest'
    @tpDestination = server.create 'tp-destination', tpid: @tariffPlan.alias, prefix: '+44'
    authenticateSession(@App, {email: "user@example.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'basic rendering', ->
    it 'renders specific header', ->
      visit '/tariff-plans/1/tp-destinations'
      click "table tbody tr:first-child td a:contains('+44')"
      andThen ->
        expect(find('main h2').text()).to.eq('TpDestination: +44')

  describe 'click edit button', ->
    it 'redirects to tp-destination edit page', ->
      visit '/tariff-plans/1/tp-destinations'
      click "table tbody tr:first-child td a:contains('+44')"
      click '.fixed-action-btn a'
      andThen ->
        expect(currentPath()).to.equal 'tariff-plans.tariff-plan.tp-destinations.tp-destination.edit'
