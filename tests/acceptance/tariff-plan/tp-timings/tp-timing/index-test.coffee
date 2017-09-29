# jshint expr:true
import Ember from 'ember'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'

describe "Acceptance: TpTiming.Index", ->
  beforeEach ->
    @App = startApp()
    @tariffPlan = server.create 'tariff-plan', name: 'Test', alias: 'tptest'
    @tpTiming = server.create 'tp-timing', tpid: @tariffPlan.alias, tag: 'new-timing'
    authenticateSession(@App, {email: "user@example.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'basic rendering', ->
    it 'renders specific header', ->
      visit '/tariff-plans/1/tp-timings'
      click "table tbody tr:first-child td a:contains('new-timing')"
      andThen ->
        expect(find('main h2').text()).to.eq('Timing: new-timing')

  describe 'click edit button', ->
    it 'redirects to tp-timing edit page', ->
      visit '/tariff-plans/1/tp-timings'
      click "table tbody tr:first-child td a:contains('new-timing')"
      click '.fixed-action-btn a'
      andThen ->
        expect(currentPath()).to.equal 'tariff-plans.tariff-plan.tp-timings.tp-timing.edit'
