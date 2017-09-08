# jshint expr:true
import Ember from 'ember'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'

describe "Acceptance: TariffPlan.Index", ->
  beforeEach ->
    @App = startApp()
    @tp = server.create 'tariff-plan', name: 'New'
    authenticateSession(@App, {email: "user@exmple.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  it 'renders specic header', ->
    visit 'tariff-plans'
    click(".row .card:first-child .card-action a:contains('Select')")
    andThen ->
      expect(find('section.page-header h1').text()).to.eq('Tariff plan: New')
