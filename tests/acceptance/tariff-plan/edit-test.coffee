# jshint expr:true
import Ember from 'ember'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { Response } from 'ember-cli-mirage'
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'

describe "Acceptance: TariffPlan.Edit", ->
  beforeEach ->
    @App = startApp()
    @tp = server.create 'tariff-plan'
    authenticateSession(@App, {email: "user@exmple.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'fill form with correct data and submit', ->
    it 'sends correct data to the backend', ->
      counter = 0

      server.patch('/tariff-plans/:id', (schema, request) =>
        counter = counter + 1
        params = JSON.parse(request.requestBody)
        expect(params.data.attributes.name).to.eq 'New Tariff'
        expect(params.data.attributes.alias).to.eq 'new_tariff'
        expect(params.data.attributes.description).to.eq 'description'
        return { data: {id: @tp.id, type: 'tariff-plans'} }
      )

      visit '/tariff-plans'
      click(".row .card:first-child .card-action a:contains('Edit')")
      andThen ->
        fillIn "##{find("label:contains('Name')").attr('for')}", 'New Tariff'
        fillIn "##{find("label:contains('Alias')").attr('for')}", 'new_tariff'
        fillIn "##{find("label:contains('Description')").attr('for')}", 'description'
        click 'button[type="submit"]'
        andThen ->
          expect(counter).to.eq 1

  describe 'fill form with incorrect data and submit', ->
    it 'sets invalid class for inputs', ->
      visit '/tariff-plans'
      click(".row .card:first-child .card-action a:contains('Edit')")
      andThen ->
        fillIn "##{find("label:contains('Name')").attr('for')}", ''
        click 'button[type="submit"]'
        expect(find("##{find("label:contains('Name')").attr('for')}").length).to.eq 1
