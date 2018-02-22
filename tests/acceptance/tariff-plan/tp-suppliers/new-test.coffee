# jshint expr:true
import Ember from 'ember'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'

describe "Acceptance: TpSuppliers.New", ->
  beforeEach ->
    @App = startApp()
    @tariffPlan = server.create 'tariff-plan', name: 'Test', alias: 'tptest'
    authenticateSession(@App, {email: "user@example.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'visit /tariff-plans/1/tp-suppliers/new', ->
    it 'renders tp-supplier form', ->
      visit '/tariff-plans/1/tp-suppliers/new'
      andThen ->
        expect(find('form input').length).to.eq(17)

  describe 'go away without save', ->
    it 'removes not saved tp-supplier', ->
      visit '/tariff-plans/1/tp-suppliers'
      click '.fixed-action-btn a'
      click "ul#slide-out li a:contains('Rates') "
      andThen ->
        expect(find('table tbody tr').length).to.eq(0)

  describe 'fill form with incorrect data and submit', ->
    it 'does not submit data', ->
      visit '/tariff-plans/1/tp-suppliers/new'
      andThen ->
        fillIn "##{find("label:contains('Tenant')").attr('for')}", ''
        fillIn "##{find("label:contains('ID')").attr('for')}", ''
        fillIn "##{find("label:contains('Filter IDs')").attr('for')}", ''
        fillIn "##{find("label:contains('Activation interval')").attr('for')}", ''
        click 'button[type="submit"]'
        andThen ->
          expect(server.db.tpSuppliers.length).to.eq 0

  describe 'fill form with correct data and submit', ->
    it 'saves new tp-supplier with correct data', ->
      visit '/tariff-plans/1/tp-suppliers/new'
      andThen ->  
        fillIn "##{find("label:contains('Tenant')").attr('for')}", 'Test'
        fillIn "##{find("label:contains('ID')").attr('for')}", 'Test'
        fillIn "##{find("label:contains('Filter IDs')").attr('for')}", '1,2'
        fillIn "##{find("label:contains('Sorting')").attr('for')}", 'ASC'
        fillIn "##{find("label:contains('Activation interval')").attr('for')}", 'Test'
        fillIn "##{find("label:contains('Supplier ID')").attr('for')}", 'Hansa'
        fillIn "##{find("label:contains('Supplier Filter IDs')").attr('for')}", '1'
        fillIn "##{find("label:contains('Supplier Account IDs')").attr('for')}", '1'
        fillIn "##{find("label:contains('Supplier Ratingplan IDs')").attr('for')}", '1'
        fillIn "##{find("label:contains('Supplier Resource IDs')").attr('for')}", '1'
        fillIn "##{find("label:contains('Supplier Stat IDs')").attr('for')}", '1'
        fillIn "##{find("label:contains('Supplier weight')").attr('for')}", 1
        fillIn "##{find("label:contains('Weight')").attr('for')}", 100
        click 'button[type="submit"]'
        andThen ->
          expect(server.db.tpSuppliers.length).to.eq 1
