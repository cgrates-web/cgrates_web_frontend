# jshint expr:true
import Ember from 'ember'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { Response } from 'ember-cli-mirage'
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'

describe "Acceptance: TpSupplier.Edit", ->
  beforeEach ->
    @App = startApp()
    @tariffPlan = server.create 'tariff-plan', name: 'Test', alias: 'tptest'
    @tpSupplier = server.create 'tp-supplier', tpid: @tariffPlan.alias
    authenticateSession(@App, {email: "user@example.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'fill form with incorrect data and submit', ->
    it 'does not submit data', ->
      counter = 0
      server.post('/tp-suppliers/', (schema, request) ->
        counter = counter + 1
        {}
      )
      visit '/tariff-plans/1/tp-suppliers'
      click 'table tbody tr:first-child a.edit'
      andThen ->
        fillIn "##{find("label:contains('Tenant')").attr('for')}", ''
        fillIn "##{find("label:contains('ID')").attr('for')}", ''      
        click 'button[type="submit"]'
        andThen ->
          expect(counter).to.eq 0

  describe 'fill form with correct data and submit', ->
    it 'sends correct data to the backend', ->
      visit '/tariff-plans/1/tp-suppliers'
      click 'table tbody tr:first-child a.edit'

      andThen =>
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
        andThen =>
          @tpSupplier.reload()
          expect(@tpSupplier.tenant).to.eq 'Test'
          expect(@tpSupplier.customId).to.eq 'Test'
          expect(@tpSupplier.filterIds).to.eq '1,2'
          expect(@tpSupplier.activationInterval).to.eq 'Test'
          expect(@tpSupplier.supplierId).to.eq 'Hansa'
          expect(@tpSupplier.supplierFilterIds).to.eq '1'
          expect(@tpSupplier.supplierAccountIds).to.eq '1'
          expect(@tpSupplier.supplierRatingplanIds).to.eq '1'
          expect(@tpSupplier.supplierResourceIds).to.eq '1'
