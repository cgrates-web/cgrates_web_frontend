# jshint expr:true
import Ember from 'ember'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'

describe "Acceptance: TpRatingPlan.Index", ->
  beforeEach ->
    @App = startApp()
    @tariffPlan = server.create 'tariff-plan', name: 'Test', alias: 'tptest'
    @tpRatingPlan = server.create 'tp-rating-plan', tpid: @tariffPlan.alias, tag: 'tagtest'
    authenticateSession(@App, {email: "user@example.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'basic rendering', ->
    it 'renders specific header', ->
      visit '/tariff-plans/1/tp-rating-plans'
      click "table tbody tr:first-child td a:contains('tagtest')"
      andThen ->
        expect(find('main h2').text()).to.eq('TpRatingPlan: tagtest')

  describe 'click edit button', ->
    it 'redirects to tp-rating-plan edit page', ->
      visit '/tariff-plans/1/tp-rating-plans'
      click "table tbody tr:first-child td a:contains('tagtest')"
      click '.fixed-action-btn a'
      andThen ->
        expect(currentPath()).to.equal 'tariff-plans.tariff-plan.tp-rating-plans.tp-rating-plan.edit'
