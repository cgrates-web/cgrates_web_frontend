# jshint expr:true
import Ember from 'ember'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'

describe "Acceptance: Account.AddBalance", ->
  beforeEach ->
    @App = startApp()
    @account = server.create 'account', id: 'test'
    authenticateSession(@App, {email: "user@eaxmple.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'visit /realtime/accounts/:id/add-balance', ->
    it 'renders add balance form', ->
      visit '/realtime/accounts'
      click "table tbody tr:first-child td a:contains('test')"
      click "a:contains('Add balance')"
      andThen ->
        expect(find('form input').length).to.eq(15)

  describe 'fill form with incorrect data and submit', ->
    it 'does not submit data', ->
      visit '/realtime/accounts'
      click "table tbody tr:first-child td a:contains('test')"
      click "a:contains('Add balance')"
      andThen ->
        fillIn "##{find("label:contains('Balance type')").attr('for')}", ''
        fillIn "##{find("label:contains('Directions')").attr('for')}", ''
        fillIn "##{find("label:contains('Value')").attr('for')}", ''
        fillIn "##{find("label:contains('Weight')").attr('for')}", ''
        fillIn "##{find("label:contains('Balance UUID')").attr('for')}", ''
        fillIn "##{find("label:contains('Balance ID')").attr('for')}", ''
        fillIn "##{find("label:contains('Expiry time')").attr('for')}", ''
        fillIn "##{find("label:contains('Rating subject')").attr('for')}", ''
        fillIn "##{find("label:contains('Categories')").attr('for')}", ''
        fillIn "##{find("label:contains('Destination IDs')").attr('for')}", ''
        fillIn "##{find("label:contains('Timing IDs')").attr('for')}", ''
        fillIn "##{find("label:contains('Shared groups')").attr('for')}", ''
        click 'button[type="submit"]'
        andThen ->
          expect(find("##{find("label:contains('Balance type')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Directions')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Value')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Weight')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Balance UUID')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Balance ID')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Expiry time')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Rating subject')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Categories')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Destination IDs')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Timing IDs')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Shared groups')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Overwrite')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Blocker')").attr('for')}").length).to.eq 1
          expect(find("##{find("label:contains('Disabled')").attr('for')}").length).to.eq 1

  describe 'fill form with correct data and submit', ->
    it 'submits correct data', ->
      counter = 0

      server.post('/add-balance/', (schema, request) ->
        counter = counter + 1
        params = JSON.parse(request.requestBody)
        expect(params.data.attributes['account']).to.eq 'test'
        expect(params.data.attributes['balance-type']).to.eq '*monetary'
        expect(params.data.attributes['directions']).to.eq '*out'
        expect(params.data.attributes['value']).to.eq 100
        expect(params.data.attributes['weight']).to.eq 10
        expect(params.data.attributes['balance-uuid']).to.eq '11111111-2222-3333-4444-555555555555'
        expect(params.data.attributes['balance-id']).to.eq 'balancetest'
        expect(params.data.attributes['expiry-time']).to.eq '0001-01-01T00:00:00Z'
        expect(params.data.attributes['rating-subject']).to.eq 'ratingsubject'
        expect(params.data.attributes['categories']).to.eq 'category1, category2'
        expect(params.data.attributes['destination-ids']).to.eq 'destination1, destination2'
        expect(params.data.attributes['timing-ids']).to.eq 'timing1, timing2'
        expect(params.data.attributes['shared-groups']).to.eq 'group1, group2'
        expect(params.data.attributes['overwrite']).to.eq false
        expect(params.data.attributes['blocker']).to.eq true
        expect(params.data.attributes['disabled']).to.eq true
        return { data: {id: '1', type: 'add-balance'} }
      )

      visit '/realtime/accounts'
      click "table tbody tr:first-child td a:contains('test')"
      click "a:contains('Add balance')"
      andThen ->
        fillIn "##{find("label:contains('Balance type')").attr('for')}", '*monetary'
        fillIn "##{find("label:contains('Directions')").attr('for')}", '*out'
        fillIn "##{find("label:contains('Value')").attr('for')}", '100'
        fillIn "##{find("label:contains('Weight')").attr('for')}", '10'
        fillIn "##{find("label:contains('Balance UUID')").attr('for')}", '11111111-2222-3333-4444-555555555555'
        fillIn "##{find("label:contains('Balance ID')").attr('for')}", 'balancetest'
        fillIn "##{find("label:contains('Expiry time')").attr('for')}", '0001-01-01T00:00:00Z'
        fillIn "##{find("label:contains('Rating subject')").attr('for')}", 'ratingsubject'
        fillIn "##{find("label:contains('Categories')").attr('for')}", 'category1, category2'
        fillIn "##{find("label:contains('Destination IDs')").attr('for')}", 'destination1, destination2'
        fillIn "##{find("label:contains('Timing IDs')").attr('for')}", 'timing1, timing2'
        fillIn "##{find("label:contains('Shared groups')").attr('for')}", 'group1, group2'
        click "##{find("label:contains('Overwrite')").attr('for')}"
        click "##{find("label:contains('Blocker')").attr('for')}"
        click "##{find("label:contains('Disabled')").attr('for')}"
        click 'button[type="submit"]'
        andThen ->
          expect(counter).to.eq 1
