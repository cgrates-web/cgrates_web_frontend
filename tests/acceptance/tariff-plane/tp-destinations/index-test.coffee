# jshint expr:true
import Ember from 'ember'
import { describe } from 'mocha'
import { expect } from 'chai'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'

describe "Acceptance: TpDestinations.Index", ->
  beforeEach ->
    @App = startApp()
    @tariffPlan = server.create 'tariff-plan', name: 'Test', alias: 'tptest'
    @tpDestinations = server.createList('tp-destination', 2, {tpid: @tariffPlan.alias})
    @other = server.createList('tp-destination', 2, {tpid: 'other'})
    authenticateSession(@App, {email: "user@example.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'visit /tariff-plans/:tariff-paln_id/tp-destinations', ->
    it "renders table with tp-destinations", ->
      visit '/tariff-plans/1/tp-destinations'
      andThen ->
        expect(find('main h2').text()).to.eq('TpDestinations list')
        expect(find('table tbody tr').length).to.eq(2)

  describe 'select tp-destination', ->
    it 'reditects to tp-destination page', ->
      visit '/tariff-plans/1/tp-destinations'
      click 'table tbody tr:first-child td:first-child a'
      andThen ->
        expect(currentPath()).to.equal "tariff-plans.tariff-plan.tp-destinations.tp-destination.index"

  describe 'click edit button', ->
    it 'reditects to edit tp-destination page', ->
      visit '/tariff-plans/1/tp-destinations'
      click 'table tbody tr:first-child a.edit'
      andThen ->
        expect(currentPath()).to.equal 'tariff-plans.tariff-plan.tp-destinations.tp-destination.edit'

  describe 'click remove button', ->
    it 'removes tp-destination', ->
      visit '/tariff-plans/1/tp-destinations'
      click 'table tbody tr:first-child a.remove'
      andThen ->
        expect(find('table tbody tr').length).to.eq(1)

  describe 'click add button', ->
    it 'redirects to new tp-destination page', ->
      visit '/tariff-plans/1/tp-destinations'
      click '.fixed-action-btn a'
      andThen ->
        expect(currentPath()).to.equal 'tariff-plans.tariff-plan.tp-destinations.new'
