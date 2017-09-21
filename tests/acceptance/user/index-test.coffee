# jshint expr:true
import Ember from 'ember'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'

describe "Acceptance: User.Index", ->
  beforeEach ->
    @App = startApp()
    @user = server.create 'user', email: 'test@example.com'
    authenticateSession(@App, {email: "user@example.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'basic rendering', ->
    it 'renders specific header', ->
      visit '/users'
      click "table tbody tr:first-child td a:contains('test@example.com')"
      andThen ->
        expect(find('section.page-header h1').text()).to.eq('User: test@example.com')

  describe 'click edit button', ->
    it 'redirects to user edit page', ->
      visit '/users'
      click "table tbody tr:first-child td a:contains('test@example.com')"
      click '.fixed-action-btn a'
      andThen ->
        expect(currentPath()).to.equal 'users.user.edit'
