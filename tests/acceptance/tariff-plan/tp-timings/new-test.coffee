# jshint expr:true
import Ember from 'ember'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'

describe "Acceptance: TpTimings.New", ->
  beforeEach ->
    @App = startApp()
    @tariffPlan = server.create 'tariff-plan', name: 'Test', alias: 'tptest'
    authenticateSession(@App, {email: "user@example.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'visit /tariff-plans/:id/tp-timings/new', ->
    it 'renders tp-timing form', ->
      visit '/tariff-plans/1/tp-timings/new'
      andThen ->
        expect(find('form input').length).to.eq(6)

  describe 'go away without save', ->
    it 'removes not saved tp-timing', ->
      visit '/tariff-plans/1/tp-timings'
      click '.fixed-action-btn a'
      click "ul#slide-out li a:contains('Timings')"
      andThen ->
        expect(find('table tbody tr').length).to.eq(0)

  describe 'fill form with correct data and submit', ->
    it 'saves new tp-timing with correct data', ->
      counter = 0

      server.post('/tp-timings/', (schema, request) ->
        counter = counter + 1
        params = JSON.parse(request.requestBody)
        expect(params.data.attributes.tpid).to.eq 'tptest'
        expect(params.data.attributes.tag).to.eq 'tagtest'
        expect(params.data.attributes.years).to.eq '2017'
        expect(params.data.attributes.months).to.eq 'june'
        expect(params.data.attributes.time).to.eq '14'
        expect(params.data.attributes["month-days"]).to.eq '30'
        expect(params.data.attributes["week-days"]).to.eq '14'
        return { data: {id: '1', type: 'tp-timing'} }
      )

      visit '/tariff-plans/1/tp-timings/new'
      andThen ->
        fillIn "##{find("label:contains('Tag')").attr('for')}", 'tagtest'
        fillIn "##{find("label:contains('Years')").attr('for')}", '2017'
        fillIn "##{find("label:contains('Months')").attr('for')}", 'june'
        fillIn "##{find("label:contains('Month Days')").attr('for')}", '30'
        fillIn "##{find("label:contains('Week Days')").attr('for')}", '14'
        fillIn "##{find("label:contains('Time')").attr('for')}", '14'
        click 'button[type="submit"]'
        andThen ->
          expect(counter).to.eq 1
