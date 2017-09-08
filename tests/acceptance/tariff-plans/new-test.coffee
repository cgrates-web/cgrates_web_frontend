# jshint expr:true
import Ember from 'ember'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { Response } from 'ember-cli-mirage';
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'

describe "Acceptance: TariffPlans.New", ->
  beforeEach ->
    @App = startApp()
    authenticateSession(@App, {email: "user@exmple.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'go away without save', ->
    it 'removes not saved destination', ->
      visit '/tariff-plans'
      click '.fixed-action-btn a'
      click "header nav li a:contains('Tariff Plans')"
      andThen ->
        expect(find('table tbody tr').length).to.eq(0)

  describe 'fill form with correct data and submit', ->
    it 'sends correct data to the backend', (done) ->
      server.post('/tariff-plans/', (schema, request) =>
        params = JSON.parse(request.requestBody)
        expect(params.data.attributes.name).to.eq 'New Tariff'
        expect(params.data.attributes.alias).to.eq 'new_tariff'
        expect(params.data.attributes.description).to.eq 'description'

        setTimeout (->
          done()
          ), 100
        return { data: {id: '1', type: 'tariff-plans'} }
      )

      visit 'tariff-plans/new'
      andThen ->
        fillIn "##{find("label:contains('Name')").attr('for')}", 'New Tariff'
        fillIn "##{find("label:contains('Alias')").attr('for')}", 'new_tariff'
        fillIn "##{find("label:contains('Description')").attr('for')}", 'description'
        click 'button[type="submit"]'

  describe 'fill form with incorrect data and submit', ->
    it 'sets invalid class for inputs', ->
      visit 'tariff-plans/new'
      click 'button[type="submit"]'
      andThen ->
        expect(find("##{find("label:contains('Name')").attr('for')}").length).to.eq 1
        expect(find("##{find("label:contains('Alias')").attr('for')}").length).to.eq 1
