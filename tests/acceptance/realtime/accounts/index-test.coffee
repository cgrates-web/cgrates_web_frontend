# jshint expr:true
import Ember from 'ember'
import { describe } from 'mocha'
import { expect } from 'chai'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'

describe "Acceptance: Accounts.Index", ->
  beforeEach ->
    @App = startApp()
    server.createList('account', 2)
    authenticateSession(@App, {email: "user@example.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'visit /realtime/accounts', ->
    it 'renders table with accounts sorted by id', ->
      visit '/realtime/accounts'
      andThen ->
        expect(find('section.page-header h1').text()).to.eq('Accounts')
        expect(find('table tbody tr').length).to.eq(2)
        expect(find('table tbody tr:first-child td:first-child').text()).to.eq('1')

  describe 'select account', ->
    it 'reditects to account page', ->
      visit '/realtime/accounts'
      click 'table tbody tr:first-child td:first-child a'
      andThen ->
        expect(currentPath()).to.equal 'realtime.accounts.account.index'

  describe 'click remove button', ->
    it 'removes account', ->
      visit '/realtime/accounts'
      click 'table tbody tr:first-child a.remove'
      andThen ->
        expect(find('table tbody tr').length).to.eq(1)

  describe 'click add button', ->
    it 'redirects to new account page', ->
      visit '/realtime/accounts'
      click '.fixed-action-btn a'
      andThen ->
        expect(currentPath()).to.equal 'realtime.accounts.new'

  describe 'click pagination link', ->
    it 'makes a correct pagination query', ->
      counter = 0

      server.get('/accounts/', (schema, request) ->
        counter = counter + 1
        page = request.queryParams['page']
        perPage = request.queryParams['per_page']
        switch counter
          when 1
            expect(page).to.eq '1'
            expect(perPage).to.eq '10'
          else
            expect(page).to.eq '2'
            expect(perPage).to.eq '10'
        return { data: [{id: '1', type: 'account'}] }
      )

      visit '/realtime/accounts'
      click 'ul.pagination li:last-child a'
      andThen ->
        expect(counter).to.eq 2
