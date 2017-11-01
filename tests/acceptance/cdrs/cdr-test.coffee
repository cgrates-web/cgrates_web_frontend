# jshint expr:true
import Ember from 'ember'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'

describe "Acceptance: Cdr.Index", ->
  beforeEach ->
    @App = startApp()
    @cdr = server.create 'cdr', id: 777
    authenticateSession(@App, {email: "user@example.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'basic rendering', ->
    it 'renders specific header', ->
      visit '/cdrs'
      click "table tbody tr:first-child td a:contains('777')"
      andThen ->
        expect(find('section.page-header h1').text()).to.eq('CDR: 777')
