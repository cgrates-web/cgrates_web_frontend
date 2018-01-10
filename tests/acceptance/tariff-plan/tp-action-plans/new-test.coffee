# jshint expr:true
import Ember from 'ember'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'
import registerPowerSelectHelpers from 'cgrates-web-frontend/tests/helpers/ember-power-select'

registerPowerSelectHelpers()

describe "Acceptance: TpActionPlans.New", ->
  beforeEach ->
    @App = startApp()
    @tariffPlan = server.create 'tariff-plan', name: 'Test', alias: 'tptest'
    @tpAction1 = server.create 'tp-action', tpid: @tariffPlan.alias, tag: 'actiontest1'
    @tpAction2 = server.create 'tp-action', tpid: @tariffPlan.alias, tag: 'actiontest2'
    authenticateSession(@App, {email: "user@example.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'visit /tariff-plans/1/tp-action-plans/new', ->
    it 'renders tp-action-plan form', ->
      visit '/tariff-plans/1/tp-action-plans/new'
      andThen ->
        expect(find('form input').length).to.eq(3)
        expect(find('form .ember-power-select-trigger').length).to.eq(1)

  describe 'go away without save', ->
    it 'removes not saved tp-action-plan', ->
      visit '/tariff-plans/1/tp-action-plans'
      click '.fixed-action-btn a'
      click "ul#slide-out li a:contains('ActionPlans')"
      andThen ->
        expect(find('table tbody tr').length).to.eq(0)

  describe 'fill form with incorrect data and submit', ->
    it 'does not submit data', ->
      visit '/tariff-plans/1/tp-action-plans/new'
      andThen ->
        fillIn "##{find("label:contains('Tag')").attr('for')}", ''
        fillIn "##{find("label:contains('Timing tag')").attr('for')}", ''
        fillIn "##{find("label:contains('Weight')").attr('for')}", ''
        click 'button[type="submit"]'
        andThen ->
          expect(find("##{find("label:contains('Tag')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Actions tag')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Timing tag')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Weight')").attr('for')}").length).to.eq 1

  describe 'fill form with correct data and submit', ->
    it 'saves new tp-action-plan with correct data', ->
      counter = 0

      server.post('/tp-action-plans/', (schema, request) ->
        counter = counter + 1
        params = JSON.parse(request.requestBody)
        expect(params.data.attributes['tpid']).to.eq 'tptest'
        expect(params.data.attributes['tag']).to.eq 'tagtest'
        expect(params.data.attributes['actions-tag']).to.eq 'actiontest1'
        expect(params.data.attributes['timing-tag']).to.eq '*asap'
        expect(params.data.attributes['weight']).to.eq 10
        return { data: {id: '1', type: 'tp-action-plan'} }
      )

      visit '/tariff-plans/1/tp-action-plans/new'
      andThen ->
        fillIn "##{find("label:contains('Tag')").attr('for')}", 'tagtest'
        selectSearch "##{find("label:contains('Actions tag')").attr('for')}", 'actiontest'
        andThen ->
          selectChoose "##{find("label:contains('Actions tag')").attr('for')}", 'actiontest1'
          fillIn "##{find("label:contains('Timing tag')").attr('for')}", '*asap'
          fillIn "##{find("label:contains('Weight')").attr('for')}", '10'
          click 'button[type="submit"]'
          andThen ->
            expect(counter).to.eq 1
