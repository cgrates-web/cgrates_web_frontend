# jshint expr:true
import Ember from 'ember'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'

describe "Acceptance: TpFilter.New", ->
  beforeEach ->
    @App = startApp()
    @tariffPlan = server.create 'tariff-plan', name: 'Test', alias: 'tptest'
    authenticateSession(@App, {email: "user@example.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'visit /tariff-plans/1/tp-filters/new', ->
    it 'renders tp-filter form', ->
      visit '/tariff-plans/1/tp-filters/new'
      andThen ->
        expect(find('form input').length).to.eq(6)

  describe 'go away without save', ->
    it 'removes not saved tp-filter', ->
      visit '/tariff-plans/1/tp-filters'
      click '.fixed-action-btn a'
      click "ul#slide-out li a:contains('TpRates')"
      andThen ->
        expect(find('table tbody tr').length).to.eq(0)

  describe 'fill form with incorrect data and submit', ->
    it 'does not submit data', ->
      counter = 0
      server.post('/tp-filters/', (schema, request) ->
        counter = counter + 1
        {}

      visit '/tariff-plans/1/tp-filters/new'
      andThen ->
        fillIn "##{find("label:contains('Tenant')").attr('for')}", ''
        fillIn "##{find("label:contains('Id')").attr('for')}", ''
        fillIn "##{find("label:contains('Filter field name").attr('for')}", ''
        fillIn "##{find("label:contains('Filter field values')").attr('for')}", ''
        fillIn "##{find("label:contains('Activation interval')").attr('for')}", ''
        click 'button[type="submit"]'
        andThen ->
          expect(counter).to.eq 0


  describe 'fill form with correct data and submit', ->
    it 'saves new tp-filter with correct data', ->
      counter = 0

      server.post('/tp-filters/', (schema, request) ->
        counter = counter + 1
        params = JSON.parse(request.requestBody)
        expect(params.data.attributes['tpid']).to.eq 'tptest'
        expect(params.data.attributes['tag']).to.eq 'tagtest'
        expect(params.data.attributes['rate-unit']).to.eq '60s'
        expect(params.data.attributes['rate-increment']).to.eq '60s'
        expect(params.data.attributes['rate']).to.eq 0.01
        expect(params.data.attributes['group-interval-start']).to.eq '60s'
        expect(params.data.attributes['connect-fee']).to.eq 0.01
        return { data: {id: '1', type: 'tp-filter'} }
      )

      visit '/tariff-plans/1/tp-filters/new'
      andThen ->
        selectChoose '.fiter-type-select', '*string'
        fillIn "##{find("label:contains('Tenant')").attr('for')}", 'Test'
        fillIn "##{find("label:contains('Id')").attr('for')}", 'Test'
        fillIn "##{find("label:contains('Filter field name").attr('for')}", 'Test'
        fillIn "##{find("label:contains('Filter field values')").attr('for')}", 'Test'
        fillIn "##{find("label:contains('Activation interval')").attr('for')}", 'Test'
        click 'button[type="submit"]'
        andThen ->
          expect(counter).to.eq 1
