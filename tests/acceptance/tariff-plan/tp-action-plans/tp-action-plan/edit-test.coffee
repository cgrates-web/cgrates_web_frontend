# jshint expr:true
import Ember from 'ember'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { Response } from 'ember-cli-mirage'
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'
import registerPowerSelectHelpers from 'cgrates-web-frontend/tests/helpers/ember-power-select'

registerPowerSelectHelpers()

describe "Acceptance: TpActionPlan.Edit", ->
  beforeEach ->
    @App = startApp()
    @tariffPlan = server.create 'tariff-plan', name: 'Test', alias: 'tptest'
    @tpAction1 = server.create 'tp-action', tpid: @tariffPlan.alias, tag: 'actiontest1'
    @tpAction2 = server.create 'tp-action', tpid: @tariffPlan.alias, tag: 'actiontest2'
    @tpActionPlan = server.create 'tp-action-plan', {
      tpid: @tariffPlan.alias
      actions_tag: @tpAction1.tag
    }
    authenticateSession(@App, {email: "user@example.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'fill form with incorrect data and submit', ->
    it 'does not submit data', ->
      visit '/tariff-plans/1/tp-action-plans'
      click 'table tbody tr:first-child a.edit'
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
    it 'sends correct data to the backend', ->
      counter = 0

      server.patch('/tp-action-plans/:id', (schema, request) =>
        counter = counter + 1
        params = JSON.parse(request.requestBody)
        expect(params.data.attributes['tpid']).to.eq 'tptest'
        expect(params.data.attributes['tag']).to.eq 'edited'
        expect(params.data.attributes['actions-tag']).to.eq 'actiontest2'
        expect(params.data.attributes['timing-tag']).to.eq '*asap'
        expect(params.data.attributes['weight']).to.eq 10
        return { data: {id: @tpActionPlan.id, type: 'tp-action-plan'} }
      )

      visit '/tariff-plans/1/tp-action-plans'
      click 'table tbody tr:first-child a.edit'
      andThen ->
        fillIn "##{find("label:contains('Tag')").attr('for')}", 'edited'
        selectSearch "##{find("label:contains('Actions tag')").attr('for')}", 'actiontest'
        andThen ->
          selectChoose "##{find("label:contains('Actions tag')").attr('for')}", 'actiontest2'
          fillIn "##{find("label:contains('Timing tag')").attr('for')}", '*asap'
          fillIn "##{find("label:contains('Weight')").attr('for')}", '10'
          click 'button[type="submit"]'
          andThen ->
            expect(counter).to.eq 1
