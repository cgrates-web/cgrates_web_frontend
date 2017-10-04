# jshint expr:true
import Ember from 'ember'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'

describe "Acceptance: Account.Index", ->
  beforeEach ->
    @App = startApp()
    @account = server.create 'account', id: 'test'
    authenticateSession(@App, {email: "user@example.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'basic rendering', ->
    it 'renders specific header', ->
      visit '/realtime/accounts'
      click "table tbody tr:first-child td a:contains('test')"
      andThen ->
        expect(find('main h2').text()).to.eq('Account: test')
