# jshint expr:true
import Ember from 'ember'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'

describe "Acceptance: TpRatingProfile.Index", ->
  beforeEach ->
    @App = startApp()
    @tariffPlan = server.create 'tariff-plan', name: 'Test', alias: 'tptest'
    @tpRatingProfile = server.create 'tp-rating-profile', tpid: @tariffPlan.alias, tenant: 'tenanttest'
    authenticateSession(@App, {email: "user@example.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'basic rendering', ->
    it 'renders specific header', ->
      visit '/tariff-plans/1/tp-rating-profiles'
      click "table tbody tr:first-child td a:contains('tenanttest')"
      andThen ->
        expect(find('main h2').text()).to.eq('TpRatingProfile: tenanttest')

  describe 'click edit button', ->
    it 'redirects to tp-rating-profile edit page', ->
      visit '/tariff-plans/1/tp-rating-profiles'
      click "table tbody tr:first-child td a:contains('tenanttest')"
      click '.fixed-action-btn a'
      andThen ->
        expect(currentPath()).to.equal 'tariff-plans.tariff-plan.tp-rating-profiles.tp-rating-profile.edit'
