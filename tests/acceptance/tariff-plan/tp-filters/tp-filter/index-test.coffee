# jshint expr:true
import Ember from 'ember'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'

describe "Acceptance: TpFilter.Index", ->
  beforeEach ->
    @App = startApp()
    tariffPlan = server.create 'tariff-plan', name: 'Test', alias: 'tptest'
    server.create 'tp-filter', tpid: tariffPlan.alias, customId: 'tagtest'
    authenticateSession(@App, {email: "user@example.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'basic rendering', ->
    it 'renders specific header', ->
      visit '/tariff-plans/1/tp-filters'
      click "table tbody tr:first-child td a:contains('tagtest')"
      andThen ->
        expect(find('main h2').text()).to.eq('TpFilter: tagtest')

  describe 'click edit button', ->
    it 'redirects to tp-filter edit page', ->
      visit '/tariff-plans/1/tp-filters'
      click "table tbody tr:first-child td a:contains('tagtest')"
      click '.fixed-action-btn a'
      andThen ->
        expect(currentPath()).to.equal 'tariff-plans.tariff-plan.tp-filters.tp-filter.edit'
