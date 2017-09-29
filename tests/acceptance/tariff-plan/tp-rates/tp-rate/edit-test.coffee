# jshint expr:true
import Ember from 'ember'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { Response } from 'ember-cli-mirage'
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'

describe "Acceptance: TpRate.Edit", ->
  beforeEach ->
    @App = startApp()
    @tariffPlan = server.create 'tariff-plan', name: 'Test', alias: 'tptest'
    @tpRate = server.create 'tp-rate', tpid: @tariffPlan.alias
    authenticateSession(@App, {email: "user@example.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'fill form with incorrect data and submit', ->
    it 'does not submit data', ->
      visit '/tariff-plans/1/tp-rates'
      click 'table tbody tr:first-child a.edit'
      andThen ->
        fillIn "##{find("label:contains('Tag')").attr('for')}", ''
        fillIn "##{find("label:contains('Rate unit (seconds)')").attr('for')}", ''
        fillIn "##{find("label:contains('Rate increment (seconds)')").attr('for')}", ''
        fillIn "##{find("label:contains('Rate (decimal)')").attr('for')}", ''
        fillIn "##{find("label:contains('Group interval start (seconds)')").attr('for')}", ''
        fillIn "##{find("label:contains('Connect fee (decimal)')").attr('for')}", ''
        click 'button[type="submit"]'
        andThen ->
          expect(find("##{find("label:contains('Tag')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Rate unit (seconds)')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Rate increment (seconds)')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Rate (decimal)')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Group interval start (seconds)')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Connect fee (decimal)')").attr('for')}").length).to.eq 1

  describe 'fill form with correct data and submit', ->
    it 'sends correct data to the backend', ->
      counter = 0

      server.patch('/tp-rates/:id', (schema, request) =>
        counter = counter + 1
        params = JSON.parse(request.requestBody)
        expect(params.data.attributes['tpid']).to.eq 'tptest'
        expect(params.data.attributes['tag']).to.eq 'edited'
        expect(params.data.attributes['rate-unit']).to.eq '60s'
        expect(params.data.attributes['rate-increment']).to.eq '60s'
        expect(params.data.attributes['rate']).to.eq 0.01
        expect(params.data.attributes['group-interval-start']).to.eq '60s'
        expect(params.data.attributes['connect-fee']).to.eq 0.01
        return { data: {id: @tpRate.id, type: 'tp-rate'} }
      )

      visit '/tariff-plans/1/tp-rates'
      click 'table tbody tr:first-child a.edit'
      andThen ->
        fillIn "##{find("label:contains('Tag')").attr('for')}", 'edited'
        fillIn "##{find("label:contains('Rate unit (seconds)')").attr('for')}", '60'
        fillIn "##{find("label:contains('Rate increment (seconds)')").attr('for')}", '60'
        fillIn "##{find("label:contains('Rate (decimal)')").attr('for')}", '0.01'
        fillIn "##{find("label:contains('Group interval start (seconds)')").attr('for')}", '60'
        fillIn "##{find("label:contains('Connect fee (decimal)')").attr('for')}", '0.01'
        click 'button[type="submit"]'
        andThen ->
          expect(counter).to.eq 1
