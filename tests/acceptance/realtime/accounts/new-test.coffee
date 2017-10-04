# jshint expr:true
import Ember from 'ember'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'

describe "Acceptance: Accounts.New", ->
  beforeEach ->
    @App = startApp()
    authenticateSession(@App, {email: "user@eaxmple.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'visit /realtime/accounts/new', ->
    it 'renders account form', ->
      visit '/realtime/accounts/new'
      andThen ->
        expect(find('form input').length).to.eq(3)

  describe 'go away without save', ->
    it 'removes not saved account', ->
      visit '/realtime/accounts'
      click '.fixed-action-btn a'
      click "ul#slide-out li a:contains('Accounts')"
      andThen ->
        expect(find('table tbody tr').length).to.eq(0)

  describe 'fill form with incorrect data and submit', ->
    it 'does not submit data', ->
      visit '/realtime/accounts/new'
      andThen ->
        fillIn "##{find("label:contains('ID')").attr('for')}", ''
        click 'button[type="submit"]'
        andThen ->
          expect(find("##{find("label:contains('ID')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Allow negative')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Disabled')").attr('for')}").length).to.eq 1

  describe 'fill form with correct data and submit', ->
    it 'saves new account with correct data', ->
      counter = 0

      server.post('/accounts/', (schema, request) ->
        counter = counter + 1
        params = JSON.parse(request.requestBody)
        expect(params.data.id).to.eq 'test'
        expect(params.data.attributes['allow-negative']).to.eq true
        expect(params.data.attributes['disabled']).to.eq true
        return { data: {id: 'test', type: 'account'} }
      )

      visit '/realtime/accounts/new'
      andThen ->
        fillIn "##{find("label:contains('ID')").attr('for')}", 'test'
        click "##{find("label:contains('Allow negative')").attr('for')}"
        click "##{find("label:contains('Disabled')").attr('for')}"
        click 'button[type="submit"]'
        andThen ->
          expect(counter).to.eq 1
