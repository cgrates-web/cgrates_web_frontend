# jshint expr:true
import Ember from 'ember'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'

describe "Acceptance: Upload Tariff plane to redis", ->
  beforeEach ->
    @App = startApp()
    @tariffPlan = server.create 'tariff-plan', name: 'Test', alias: 'tptest'
    authenticateSession(@App, {email: "user@exmple.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'go to load tariff-plan page and fill in form', ->
    it "sends correct request to the server", ->
      server.post '/load-tariff-plan/', (schema, request) =>
        params = JSON.parse(request.requestBody)

        expect(params.data.attributes.tpid).to.eq @tariffPlan.alias
        expect(params.data.attributes["flush-db"]).to.eq true
        expect(params.data.attributes["dry-run"]).to.eq false
        expect(params.data.attributes.validate).to.eq false

        {result: 'OK'}

      visit '/tariff-plans'
      click ".row .card:first-child .card-action a:contains('Select')"
      click "ul#slide-out li a:contains('Upload to redis')"

      click "label:contains('Flush DB')"
      click 'button[type="submit"]'
    describe 'backend sends success', ->
      it 'renders suceess message', ->
        server.post '/load-tariff-plan/', (schema, request) -> {result: 'OK'}

        visit '/tariff-plans'
        click ".row .card:first-child .card-action a:contains('Select')"
        click "ul#slide-out li a:contains('Upload to redis')"
        click 'button[type="submit"]'
      
        andThen ->
          expect(find('.alert.alert-success').text()).to.eq "Success!\xa0Tariff plan has been uploaded to CGrates"


      describe 'backend sends success', ->
        it "renders danger message and error's text", ->
          server.post '/load-tariff-plan/', (schema, request) -> {error: 'Some error from cgrates'}

          visit '/tariff-plans'
          click ".row .card:first-child .card-action a:contains('Select')"
          click "ul#slide-out li a:contains('Upload to redis')"
          click 'button[type="submit"]'

          andThen ->
            expect(find('.alert.alert-danger').text()).to.eq "Error!\xa0Some error from cgrates"
