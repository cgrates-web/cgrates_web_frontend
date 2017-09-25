# jshint expr:true
import Ember from 'ember'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { Response } from 'ember-cli-mirage';
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'

describe "Acceptance: TpDestination.Edit", ->
  beforeEach ->
    @App = startApp()
    @tariffPlan = server.create 'tariff-plan', name: 'Test', alias: 'tptest'
    @tpDestination = server.create 'tp-destination', tpid: @tariffPlan.alias
    authenticateSession(@App, {email: "user@example.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'fill form with incorrect data and submit', ->
    it 'does not submit data', ->
      visit '/tariff-plans/1/tp-destinations'
      click 'table tbody tr:first-child a.edit'
      andThen ->
        fillIn "##{find("label:contains('Tag')").attr('for')}", ''
        fillIn "##{find("label:contains('Prefix')").attr('for')}", ''
        click 'button[type="submit"]'
        andThen ->
          expect(find("##{find("label:contains('Tag')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Prefix')").attr('for')}").length).to.eq 1

  describe 'fill form with correct data and submit', ->
    it 'sends correct data to the backend', (done) ->
      server.patch('/tp-destinations/:id', (schema, request) =>
        params = JSON.parse(request.requestBody)
        expect(params.data.attributes.tpid).to.eq 'tptest'
        expect(params.data.attributes.tag).to.eq 'edited'
        expect(params.data.attributes.prefix).to.eq '+44'
        setTimeout (->
          done()
          ), 100
        return { data: {id: @tpDestination.id, type: 'tp-destination'} }
      )

      visit '/tariff-plans/1/tp-destinations'
      click 'table tbody tr:first-child a.edit'
      andThen ->
        fillIn "##{find("label:contains('Tag')").attr('for')}", 'edited'
        fillIn "##{find("label:contains('Prefix')").attr('for')}", '+44'
        click 'button[type="submit"]'
