# jshint expr:true
import Ember from 'ember'
import { describe } from 'mocha'
import { expect } from 'chai'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'

describe "Acceptance: Users.Index", ->
  beforeEach ->
    @App = startApp()
    @users = server.createList('user', 2)
    authenticateSession(@App, {email: "user@example.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'visit /users', ->
    it "renders table with users sorted by id", ->
      visit "/users"
      andThen ->
        expect(find('section.page-header h1').text()).to.eq('Users')
        expect(find('table tbody tr').length).to.eq(2)
        expect(find('table tbody tr:first-child td:first-child').text()).to.eq('1')

  describe 'select user', ->
    it 'reditects to user page', ->
      visit '/users'
      click 'table tbody tr:first-child td:first-child a'
      andThen ->
        expect(currentPath()).to.equal "users.user.index"

  describe 'click edit button', ->
    it 'reditects to edit user page', ->
      visit '/users'
      click 'table tbody tr:first-child a.edit'
      andThen ->
        expect(currentPath()).to.equal 'users.user.edit'

  describe 'click remove button', ->
    it 'removes user', ->
      visit "/users"
      click 'table tbody tr:first-child a.remove'
      andThen ->
        expect(find('table tbody tr').length).to.eq(1)

  describe 'click add button', ->
    it 'redirects to new user page', ->
      visit '/users'
      click '.fixed-action-btn a'
      andThen ->
        expect(currentPath()).to.equal 'users.new'
