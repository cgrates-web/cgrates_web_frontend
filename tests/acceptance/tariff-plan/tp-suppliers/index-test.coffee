# jshint expr:true
import Ember from 'ember'
import { describe } from 'mocha'
import { expect } from 'chai'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'

describe "Acceptance: TpSuppliers.Index", ->
  beforeEach ->
    @App = startApp()
    @tariffPlan = server.create 'tariff-plan', name: 'Test', alias: 'tptest'
    server.createList('tp-supplier', 2, {tpid: @tariffPlan.alias})
    authenticateSession(@App, {email: "user@example.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'visit /tariff-plans/1/tp-suppliers', ->
    it "renders table with tp-suppliers", ->
      visit '/tariff-plans/1/tp-suppliers'
      andThen ->
        expect(find('main h2').text()).to.eq('Suppliers list')
        expect(find('table tbody tr').length).to.eq(2)

  describe 'select tp-supplier', ->
    it 'reditects to tp-supplier page', ->
      visit '/tariff-plans/1/tp-suppliers'
      click 'table tbody tr:first-child td:first-child a'
      andThen ->
        expect(currentPath()).to.equal "tariff-plans.tariff-plan.tp-suppliers.tp-supplier.index"

  describe 'click edit button', ->
    it 'reditects to edit tp-supplier page', ->
      visit '/tariff-plans/1/tp-suppliers'
      click 'table tbody tr:first-child a.edit'
      andThen ->
        expect(currentPath()).to.equal 'tariff-plans.tariff-plan.tp-suppliers.tp-supplier.edit'

  describe 'click remove button', ->
    it 'removes tp-supplier', ->
      visit '/tariff-plans/1/tp-suppliers'
      click 'table tbody tr:first-child a.remove'
      andThen ->
        expect(find('table tbody tr').length).to.eq(1)

  describe 'click add button', ->
    it 'redirects to new tp-supplier page', ->
      visit '/tariff-plans/1/tp-suppliers'
      click '.fixed-action-btn a'
      andThen ->
        expect(currentPath()).to.equal 'tariff-plans.tariff-plan.tp-suppliers.new'

  describe 'click pagination link', ->
    it 'makes a correct pagination query', ->
      counter = 0

      server.get('/tp-suppliers/', (schema, request) ->
        counter = counter + 1
        pagePage = request.queryParams['page[page]']
        pagePageSize = request.queryParams['page[page-size]']
        switch counter
          when 1
            expect(pagePage).to.eq '1'
            expect(pagePageSize).to.eq '10'
          else
            expect(pagePage).to.eq '2'
            expect(pagePageSize).to.eq '10'
        return { data: [{id: '1', type: 'tp-supplier'}], meta: {total_pages: 2} }
      )

      visit '/tariff-plans/1/tp-suppliers'
      click "ul.pagination li a:contains('2')"
      andThen ->
        expect(counter).to.eq 2
