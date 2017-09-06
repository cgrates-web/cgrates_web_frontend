# jshint expr:true
import Ember from 'ember'
import { describe } from 'mocha'
import { expect } from 'chai'
import startApp from '../helpers/start-app'

describe "Acceptance: Authorize users", ->
  beforeEach ->
    @App = startApp()
    server.createList('destination', 2)
    return

  afterEach ->
    Ember.run(@App, "destroy")

  it "redirects not auth user to login", ->
    visit "/"
    andThen ->
      expect(currentPath()).to.equal "login"
