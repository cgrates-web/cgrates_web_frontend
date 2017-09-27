# jshint expr:true
import Ember from 'ember'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'

describe "Acceptance: NewDestination", ->
  beforeEach ->
    @App = startApp()
    authenticateSession(@App, {email: "user@exmple.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'go away without save', ->
    it 'removes not saved destination', ->
      visit '/realtime/destinations'
      click '.fixed-action-btn a'
      click "ul#slide-out li a:contains('Destinations')"
      andThen ->
        expect(find('table tbody tr').length).to.eq(0)

  describe 'click to button on /destinations page', ->
    it 'redirects to /destinations/new', ->
      visit "/realtime/destinations"
      click '.fixed-action-btn a'
      andThen ->
        expect(currentPath()).to.equal "realtime.destinations.new"

  describe 'visit /realtime/destinations/new', ->
    it 'renders destination form', ->
      visit '/realtime/destinations/new'
      andThen ->
        expect(find('form input').length).to.eq(2)


  describe 'fill in and submit form', ->
    it 'saves new destination', ->
      server.post('/destinations/', (schema, request) ->
        params = JSON.parse(request.requestBody)
        expect(params.data.id).to.eq 'DST_RU'
        expect(params.data.attributes.prefixes.length).to.eq(2)
        return { data: {id: 'DST_RU', type: 'destinations'} }
      )

      visit '/realtime/destinations/new'
      fillIn 'input#id', 'DST_RU'
      fillIn 'input#prefixes', '+7913, +7923'
      click 'button[type="submit"]'
