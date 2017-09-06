# jshint expr:true
import Ember from 'ember'
import startApp from '../helpers/start-app'
import { authenticateSession } from '../helpers/ember-simple-auth'

describe "Acceptance: CreateNewDestination", ->
  beforeEach ->
    @App = startApp()
    authenticateSession(@App, {email: "user@exmple.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'click to button on /destinations page', ->
    it 'redirects to /destinations/new', ->
      visit "/destinations"
      click '.fixed-action-btn a'
      andThen ->
        expect(currentPath()).to.equal "destinations.new"

  describe 'visit /destinations/new', ->
    it 'renders destination form', ->
      visit '/destinations/new'
      andThen ->
        expect(find('form input').length).to.eq(2)


  describe 'fill in and submit form', ->
    it 'saves new destination', (done) ->
      server.post('/destinations/', (schema, request) =>
        params = JSON.parse(request.requestBody)
        expect(params.data.id).to.eq 'DST_RU'
        expect(params.data.attributes.prefixes.length).to.eq(2)
        setTimeout (->
          done()
          ), 100
        return { data: {id: 'DST_RU', type: 'destinations'} }
      )

      visit '/destinations/new'
      fillIn 'input#id', 'DST_RU'
      fillIn 'input#prefixes', '+7913, +7923'
      click 'button[type="submit"]'
