# jshint expr:true
import Ember from 'ember'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { Response } from 'ember-cli-mirage'
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'
import registerPowerSelectHelpers from 'cgrates-web-frontend/tests/helpers/ember-power-select'

registerPowerSelectHelpers()

describe "Acceptance: TpAction.Edit", ->
  beforeEach ->
    @App = startApp()
    @tariffPlan = server.create 'tariff-plan', name: 'Test', alias: 'tptest'
    @tpAction = server.create 'tp-action', tpid: @tariffPlan.alias
    authenticateSession(@App, {email: "user@example.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'fill form with incorrect data and submit', ->
    it 'does not submit data', ->
      visit '/tariff-plans/1/tp-actions'
      click 'table tbody tr:first-child a.edit'
      andThen ->
        fillIn "##{find("label:contains('Tag')").attr('for')}", ''
        fillIn "##{find("label:contains('Balance tag')").attr('for')}", ''
        fillIn "##{find("label:contains('Units')").attr('for')}", ''
        fillIn "##{find("label:contains('Expiry time')").attr('for')}", ''
        fillIn "##{find("label:contains('Timing tags')").attr('for')}", ''
        fillIn "##{find("label:contains('Destination tags')").attr('for')}", ''
        fillIn "##{find("label:contains('Rating subject')").attr('for')}", ''
        fillIn "##{find("label:contains('Categories')").attr('for')}", ''
        fillIn "##{find("label:contains('Shared groups')").attr('for')}", ''
        fillIn "##{find("label:contains('Balance weight')").attr('for')}", ''
        fillIn "##{find("label:contains('Extra parameters')").attr('for')}", ''
        fillIn "##{find("label:contains('Filter')").attr('for')}", ''
        fillIn "##{find("label:contains('Weight')").attr('for')}", ''
        click 'button[type="submit"]'
        andThen ->
          expect(find("##{find("label:contains('Tag')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Action')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Balance tag')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Balance type')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Directions')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Units')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Expiry time')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Timing tags')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Destination tags')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Rating subject')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Categories')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Shared groups')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Balance weight')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Balance blocker')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Balance disabled')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Extra parameters')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Filter')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Weight')").attr('for')}").length).to.eq 1

  describe 'fill form with correct data and submit', ->
    it 'sends correct data to the backend', ->
      counter = 0

      server.patch('/tp-actions/:id', (schema, request) =>
        counter = counter + 1
        params = JSON.parse(request.requestBody)
        expect(params.data.attributes['tpid']).to.eq 'tptest'
        expect(params.data.attributes['tag']).to.eq 'edited'
        expect(params.data.attributes['action']).to.eq '*log'
        expect(params.data.attributes['balance-tag']).to.eq 'balancetest'
        expect(params.data.attributes['balance-type']).to.eq '*monetary'
        expect(params.data.attributes['directions']).to.eq '*out'
        expect(params.data.attributes['units']).to.eq '120'
        expect(params.data.attributes['expiry-time']).to.eq '*unlimited'
        expect(params.data.attributes['timing-tags']).to.eq 'timingtest'
        expect(params.data.attributes['destination-tags']).to.eq 'destinationtest'
        expect(params.data.attributes['rating-subject']).to.eq 'subjecttest'
        expect(params.data.attributes['categories']).to.eq 'categoriestest'
        expect(params.data.attributes['shared-groups']).to.eq 'groupstest'
        expect(params.data.attributes['balance-weight']).to.eq '20'
        expect(params.data.attributes['balance-blocker']).to.eq 'false'
        expect(params.data.attributes['balance-disabled']).to.eq 'false'
        expect(params.data.attributes['extra-parameters']).to.eq 'parameterstest'
        expect(params.data.attributes['filter']).to.eq 'filtertest'
        expect(params.data.attributes['weight']).to.eq 10
        return { data: {id: @tpAction.id, type: 'tp-action'} }
      )

      visit '/tariff-plans/1/tp-actions'
      click 'table tbody tr:first-child a.edit'
      andThen ->
        fillIn "##{find("label:contains('Tag')").attr('for')}", 'edited'
        selectChoose "##{find("label:contains('Action')").attr('for')}", '*log'
        fillIn "##{find("label:contains('Balance tag')").attr('for')}", 'balancetest'
        selectChoose "##{find("label:contains('Balance type')").attr('for')}", '*monetary'
        selectChoose "##{find("label:contains('Directions')").attr('for')}", '*out'
        fillIn "##{find("label:contains('Units')").attr('for')}", '120'
        fillIn "##{find("label:contains('Expiry time')").attr('for')}", '*unlimited'
        fillIn "##{find("label:contains('Timing tags')").attr('for')}", 'timingtest'
        fillIn "##{find("label:contains('Destination tags')").attr('for')}", 'destinationtest'
        fillIn "##{find("label:contains('Rating subject')").attr('for')}", 'subjecttest'
        fillIn "##{find("label:contains('Categories')").attr('for')}", 'categoriestest'
        fillIn "##{find("label:contains('Shared groups')").attr('for')}", 'groupstest'
        fillIn "##{find("label:contains('Balance weight')").attr('for')}", '20'
        selectChoose "##{find("label:contains('Balance blocker')").attr('for')}", 'false'
        selectChoose "##{find("label:contains('Balance disabled')").attr('for')}", 'false'
        fillIn "##{find("label:contains('Extra parameters')").attr('for')}", 'parameterstest'
        fillIn "##{find("label:contains('Filter')").attr('for')}", 'filtertest'
        fillIn "##{find("label:contains('Weight')").attr('for')}", '10'
        click 'button[type="submit"]'
        andThen ->
          expect(counter).to.eq 1
