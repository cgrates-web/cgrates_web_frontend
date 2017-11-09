# jshint expr:true
import Ember from 'ember'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'

describe "Acceptance: TpLcrRule.Index", ->
  beforeEach ->
    @App = startApp()
    @tariffPlan = server.create 'tariff-plan', name: 'Test', alias: 'tptest'
    @tpLcrRule = server.create 'tp-lcr-rule', tpid: @tariffPlan.alias, id: 'test'
    authenticateSession(@App, {email: "user@example.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'basic rendering', ->
    it 'renders specific header', ->
      visit '/tariff-plans/1/tp-lcr-rules'
      click "table tbody tr:first-child td a:contains('test')"
      andThen ->
        expect(find('main h2').text()).to.eq('TpLcrRule: test')

  describe 'click edit button', ->
    it 'redirects to tp-lcr-rule edit page', ->
      visit '/tariff-plans/1/tp-lcr-rules'
      click "table tbody tr:first-child td a:contains('test')"
      click '.fixed-action-btn a'
      andThen ->
        expect(currentPath()).to.equal 'tariff-plans.tariff-plan.tp-lcr-rules.tp-lcr-rule.edit'
