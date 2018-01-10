# jshint expr:true
import Ember from 'ember'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'
import registerPowerSelectHelpers from 'cgrates-web-frontend/tests/helpers/ember-power-select'

registerPowerSelectHelpers()

describe "Acceptance: TpRatingPlans.New", ->
  beforeEach ->
    @App = startApp()
    @tariffPlan = server.create 'tariff-plan', name: 'Test', alias: 'tptest'
    @tpDestinationRate1 = server.create 'tp-destination-rate', tpid: 'tptest', tag: 'destratetest1'
    @tpDestinationRate2 = server.create 'tp-destination-rate', tpid: 'tptest', tag: 'destratetest2'
    @tpTiming1 = server.create 'tp-timing', tpid: 'tptest', tag: 'timingtest1'
    @tpTiming2 = server.create 'tp-timing', tpid: 'tptest', tag: 'timingtest2'
    authenticateSession(@App, {email: "user@example.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'visit /tariff-plans/1/tp-rating-plans/new', ->
    it 'renders tp-rating-plan form', ->
      visit '/tariff-plans/1/tp-rating-plans/new'
      andThen ->
        expect(find('form input').length).to.eq(2)
        expect(find('form .ember-power-select-trigger').length).to.eq(2)

  describe 'go away without save', ->
    it 'removes not saved tp-rating-plan', ->
      visit '/tariff-plans/1/tp-rating-plans'
      click '.fixed-action-btn a'
      click "ul#slide-out li a:contains('RatingPlans')"
      andThen ->
        expect(find('table tbody tr').length).to.eq(0)

  describe 'fill form with incorrect data and submit', ->
    it 'does not submit data', ->
      visit '/tariff-plans/1/tp-rating-plans/new'
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
    it 'saves new tp-rating-plan with correct data', ->
      counter = 0

      server.post('/tp-rating-plans/', (schema, request) ->
        counter = counter + 1
        params = JSON.parse(request.requestBody)
        expect(params.data.attributes['tpid']).to.eq 'tptest'
        expect(params.data.attributes['tag']).to.eq 'tagtest'
        expect(params.data.attributes['destrates-tag']).to.eq 'destratetest1'
        expect(params.data.attributes['timing-tag']).to.eq 'timingtest1'
        expect(params.data.attributes['weight']).to.eq 12.1
        return { data: {id: '1', type: 'tp-rating-plan'} }
      )

      visit '/tariff-plans/1/tp-rating-plans/new'
      andThen ->
        fillIn "##{find("label:contains('Tag')").attr('for')}", 'tagtest'
        selectSearch "##{find("label:contains('Destination rates tag')").attr('for')}", 'destratetest'
        andThen ->
          selectChoose "##{find("label:contains('Destination rates tag')").attr('for')}", 'destratetest1'
          selectSearch "##{find("label:contains('Timing tag')").attr('for')}", 'timingtest'
          andThen ->
            selectChoose "##{find("label:contains('Timing tag')").attr('for')}", 'timingtest1'
            fillIn "##{find("label:contains('Weight (decimal)')").attr('for')}", '12.1'
            click 'button[type="submit"]'
            andThen ->
              expect(counter).to.eq 1
