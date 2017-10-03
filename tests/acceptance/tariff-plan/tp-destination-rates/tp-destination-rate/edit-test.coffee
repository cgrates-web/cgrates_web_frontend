# jshint expr:true
import Ember from 'ember'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { Response } from 'ember-cli-mirage'
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'
import registerPowerSelectHelpers from 'cgrates-web-frontend/tests/helpers/ember-power-select'

registerPowerSelectHelpers()

describe "Acceptance: TpDestinationRate.Edit", ->
  beforeEach ->
    @App = startApp()
    @tariffPlan = server.create 'tariff-plan', name: 'Test', alias: 'tptest'
    @tpRate1 = server.create 'tp-rate', tpid: 'tptest', tag: 'ratetest1'
    @tpRate2 = server.create 'tp-rate', tpid: 'tptest', tag: 'ratetest2'
    @tpDestination1 = server.create 'tp-destination', tpid: 'tptest', tag: 'destinationtest1'
    @tpDestination2 = server.create 'tp-destination', tpid: 'tptest', tag: 'destinationtest2'
    @tpDestinationRate = server.create 'tp-destination-rate', {
      tpid: @tariffPlan.alias
      rates_tag: @tpRate1.tag
      destinations_tag: @tpDestination1.tag
    }
    authenticateSession(@App, {email: "user@example.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'fill form with incorrect data and submit', ->
    it 'does not submit data', ->
      visit '/tariff-plans/1/tp-destination-rates'
      click 'table tbody tr:first-child a.edit'
      andThen ->
        fillIn "##{find("label:contains('Tag')").attr('for')}", ''
        fillIn "##{find("label:contains('Rounding decimals')").attr('for')}", ''
        fillIn "##{find("label:contains('Max cost (decimal)')").attr('for')}", ''
        click 'button[type="submit"]'
        andThen ->
          expect(find("##{find("label:contains('Tag')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Rates tag')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Destinations tag')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Rounding decimals')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Max cost (decimal)')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Rounding method')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Max cost strategy')").attr('for')}").length).to.eq 1

  describe 'fill form with correct data and submit', ->
    it 'sends correct data to the backend', ->
      counter = 0

      server.patch('/tp-destination-rates/:id', (schema, request) =>
        counter = counter + 1
        params = JSON.parse(request.requestBody)
        expect(params.data.attributes['tpid']).to.eq 'tptest'
        expect(params.data.attributes['tag']).to.eq 'edited'
        expect(params.data.attributes['rates-tag']).to.eq 'ratetest2'
        expect(params.data.attributes['destinations-tag']).to.eq 'destinationtest2'
        expect(params.data.attributes['rounding-decimals']).to.eq 1
        expect(params.data.attributes['max-cost']).to.eq 100.0
        expect(params.data.attributes['rounding-method']).to.eq '*middle'
        expect(params.data.attributes['max-cost-strategy']).to.eq '*disconnect'
        return { data: {id: @tpDestinationRate.id, type: 'tp-destination-rate'} }
      )

      visit '/tariff-plans/1/tp-destination-rates'
      click 'table tbody tr:first-child a.edit'
      andThen ->
        fillIn "##{find("label:contains('Tag')").attr('for')}", 'edited'
        selectSearch "##{find("label:contains('Rates tag')").attr('for')}", 'ratetest'
        andThen ->
          selectChoose "##{find("label:contains('Rates tag')").attr('for')}", 'ratetest2'
          selectSearch "##{find("label:contains('Destinations tag')").attr('for')}", 'destinationtest'
          andThen ->
            selectChoose "##{find("label:contains('Destinations tag')").attr('for')}", 'destinationtest2'
            fillIn "##{find("label:contains('Rounding decimals')").attr('for')}", '1'
            fillIn "##{find("label:contains('Max cost (decimal)')").attr('for')}", '100.0'
            selectChoose "##{find("label:contains('Rounding method')").attr('for')}", '*middle'
            selectChoose "##{find("label:contains('Max cost strategy')").attr('for')}", '*disconnect'
            click 'button[type="submit"]'
            andThen ->
              expect(counter).to.eq 1
