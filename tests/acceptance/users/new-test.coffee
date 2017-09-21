# jshint expr:true
import Ember from 'ember'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'

describe "Acceptance: Users.New", ->
  beforeEach ->
    @App = startApp()
    authenticateSession(@App, {email: "user@example.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'visit /users/new', ->
    it 'renders user form', ->
      visit '/users/new'
      andThen ->
        expect(find('form input').length).to.eq(1)

  describe 'go away without save', ->
    it 'removes not saved user', ->
      visit '/users'
      click '.fixed-action-btn a'
      click "header nav li a:contains('Users')"
      andThen ->
        expect(find('table tbody tr').length).to.eq(0)

  describe 'fill form with incorrect data and submit', ->
    it 'sets invalid class for inputs', ->
      visit 'users/new'
      andThen ->
        fillIn "##{find("label:contains('Email')").attr('for')}", 'not.an.email'
        click 'button[type="submit"]'
        andThen ->
          expect(find("##{find("label:contains('Email')").attr('for')}").length).to.eq 1

  describe 'fill form with correct data and submit', ->
    it 'saves new user with correct data', (done) ->
      server.post('/users/', (schema, request) =>
        params = JSON.parse(request.requestBody)
        expect(params.data.attributes.email).to.eq 'test@example.com'
        setTimeout (->
          done()
          ), 100
        return { data: {id: '1', type: 'user'} }
      )

      visit '/users/new'
      andThen ->
        fillIn "##{find("label:contains('Email')").attr('for')}", 'test@example.com'
        click 'button[type="submit"]'
