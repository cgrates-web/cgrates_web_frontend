# jshint expr:true
import Ember from 'ember'
import { describe } from 'mocha'
import { expect } from 'chai'
import startApp from '../helpers/start-app'
import { authenticateSession } from '../helpers/ember-simple-auth'

describe "Acceptance: Index page", ->
  beforeEach ->
    @App = startApp()
    authenticateSession(@App, {email: "user@exmple.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  it "redirects to /realtime", ->
    visit "/"
    andThen ->
      expect(currentPath()).to.equal "realtime.index"
