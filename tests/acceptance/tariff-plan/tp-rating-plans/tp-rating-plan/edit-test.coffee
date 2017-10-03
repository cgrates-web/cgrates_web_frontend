# jshint expr:true
import Ember from 'ember'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { Response } from 'ember-cli-mirage'
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'
import registerPowerSelectHelpers from 'cgrates-web-frontend/tests/helpers/ember-power-select'

registerPowerSelectHelpers()

describe "Acceptance: TpRatingPlan.Edit", ->
  beforeEach ->
    @App = startApp()
    @tariffPlan = server.create 'tariff-plan', name: 'Test', alias: 'tptest'
    @tpDestinationRate1 = server.create 'tp-destination-rate', tpid: 'tptest', tag: 'destratetest1'
    @tpDestinationRate2 = server.create 'tp-destination-rate', tpid: 'tptest', tag: 'destratetest2'
    @tpTiming1 = server.create 'tp-timing', tpid: 'tptest', tag: 'timingtest1'
    @tpTiming2 = server.create 'tp-timing', tpid: 'tptest', tag: 'timingtest2'
    @tpRatingPlan = server.create 'tp-rating-plan', {
      tpid: @tariffPlan.alias
      destrates_tag: @tpDestinationRate1.tag
      timing_tag: @tpTiming1.tag
    }
    authenticateSession(@App, {email: "user@example.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'fill form with incorrect data and submit', ->
    it 'does not submit data', ->
      visit '/tariff-plans/1/tp-rating-plans'
      click 'table tbody tr:first-child a.edit'
      andThen ->
        fillIn "##{find("label:contains('Tag')").attr('for')}", ''
        fillIn "##{find("label:contains('Weight (decimal)')").attr('for')}", ''
        click 'button[type="submit"]'
        andThen ->
          expect(find("##{find("label:contains('Tag')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Destination rates tag')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Timing tag')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Weight (decimal)')").attr('for')}").length).to.eq 1

  describe 'fill form with correct data and submit', ->
    it 'sends correct data to the backend', ->
      counter = 0

      server.patch('/tp-rating-plans/:id', (schema, request) =>
        counter = counter + 1
        params = JSON.parse(request.requestBody)
        expect(params.data.attributes['tpid']).to.eq 'tptest'
        expect(params.data.attributes['tag']).to.eq 'edited'
        expect(params.data.attributes['destrates-tag']).to.eq 'destratetest2'
        expect(params.data.attributes['timing-tag']).to.eq 'timingtest2'
        expect(params.data.attributes['weight']).to.eq 12.1
        return { data: {id: @tpRatingPlan.id, type: 'tp-rating-plan'} }
      )

      visit '/tariff-plans/1/tp-rating-plans'
      click 'table tbody tr:first-child a.edit'
      andThen ->
        fillIn "##{find("label:contains('Tag')").attr('for')}", 'edited'
        selectSearch "##{find("label:contains('Destination rates tag')").attr('for')}", 'destratetest'
        andThen ->
          selectChoose "##{find("label:contains('Destination rates tag')").attr('for')}", 'destratetest2'
          selectSearch "##{find("label:contains('Timing tag')").attr('for')}", 'timingtest'
          andThen ->
            selectChoose "##{find("label:contains('Timing tag')").attr('for')}", 'timingtest2'
            fillIn "##{find("label:contains('Weight (decimal)')").attr('for')}", '12.1'
            click 'button[type="submit"]'
            andThen ->
              expect(counter).to.eq 1
