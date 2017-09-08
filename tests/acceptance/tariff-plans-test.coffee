# jshint expr:true
import Ember from 'ember'
import startApp from '../helpers/start-app'
import { authenticateSession } from '../helpers/ember-simple-auth'

describe "Acceptance: TariffPlans", ->
  beforeEach ->
    @App = startApp()
    @tps = server.createList('tariff-plan', 5)
    authenticateSession(@App, {email: "user@exmple.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'visit /tariff-plans', ->
    it 'renders list of tariff-plans cards', ->
      visit '/tariff-plans'
      andThen =>
        expect(find('.row .card').length).to.eq 5
        expect(find('.row .card .card-title').text()).to.eq @tps.map((tp) -> tp.name).join('')

  describe 'select tariff plan', ->
    it 'reditects to tariff plan page', ->
      visit '/tariff-plans'
      click(".row .card:first-child .card-action a:contains('Select')")
      andThen ->
        expect(currentPath()).to.equal "tariff-plans.tariff-plan.index"

  describe 'go to edit tariff plan page', ->
    it 'reditects to tariff plan page', ->
      visit '/tariff-plans'
      click(".row .card:first-child .card-action a:contains('Edit')")
      andThen ->
        expect(currentPath()).to.equal 'tariff-plans.tariff-plan.edit'

  describe 'click to add button', ->
    it 'redirects to tariff-plans/new page', ->
      visit '/tariff-plans'
      click '.fixed-action-btn a'
      andThen ->
        expect(currentPath()).to.equal 'tariff-plans.new'
