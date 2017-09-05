# jshint expr:true
import Ember from 'ember'
import { describe } from 'mocha'
import { expect } from 'chai'
import startApp from '../helpers/start-app'

describe "Acceptance: Destinations", ->
  beforeEach ->
    @App = startApp()
    server.createList('destination', 2)
    return

  afterEach ->
    Ember.run(@App, "destroy")

  it "renders table with destinations", ->
    visit "/destinations"
    andThen ->
      expect(find('header h1').text()).to.eq('Destinations')
      expect(find('table tbody tr').length).to.eq(2)

  describe 'click on remove btn', ->
    it 'removes destination', ->
      visit "/destinations"
      click 'table tbody tr:first-child a.remove'
      andThen ->
        expect(find('table tbody tr').length).to.eq(1)
