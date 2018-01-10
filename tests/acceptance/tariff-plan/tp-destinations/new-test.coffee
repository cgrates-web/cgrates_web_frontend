# jshint expr:true
import Ember from 'ember'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'

describe "Acceptance: TpDestinations.New", ->
  beforeEach ->
    @App = startApp()
    @tariffPlan = server.create 'tariff-plan', name: 'Test', alias: 'tptest'
    authenticateSession(@App, {email: "user@example.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'visit /tariff-plans/1/tp-destinations/new', ->
    it 'renders tp-destination form', ->
      visit '/tariff-plans/1/tp-destinations/new'
      andThen ->
        expect(find('form input').length).to.eq(2)

  describe 'go away without save', ->
    it 'removes not saved tp-destination', ->
      visit '/tariff-plans/1/tp-destinations'
      click '.fixed-action-btn a'
      click "ul#slide-out li a:contains('Destinations')"
      andThen ->
        expect(find('table tbody tr').length).to.eq(0)

  describe 'fill form with incorrect data and submit', ->
    it 'does not submit data', ->
      visit '/tariff-plans/1/tp-destinations/new'
      andThen ->
        fillIn "##{find("label:contains('Tag')").attr('for')}", ''
        fillIn "##{find("label:contains('Prefix')").attr('for')}", ''
        click 'button[type="submit"]'
        andThen ->
          expect(find("##{find("label:contains('Tag')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Prefix')").attr('for')}").length).to.eq 1

  describe 'fill form with correct data and submit', ->
    it 'saves new tp-destination with correct data', ->
      counter = 0

      server.post('/tp-destinations/', (schema, request) ->
        counter = counter + 1
        params = JSON.parse(request.requestBody)
        expect(params.data.attributes.tpid).to.eq 'tptest'
        expect(params.data.attributes.tag).to.eq 'tagtest'
        expect(params.data.attributes.prefix).to.eq '+44'
        return { data: {id: '1', type: 'tp-destination'} }
      )

      visit '/tariff-plans/1/tp-destinations/new'
      andThen ->
        fillIn "##{find("label:contains('Tag')").attr('for')}", 'tagtest'
        fillIn "##{find("label:contains('Prefix')").attr('for')}", '+44'
        click 'button[type="submit"]'
        andThen ->
          expect(counter).to.eq 1
