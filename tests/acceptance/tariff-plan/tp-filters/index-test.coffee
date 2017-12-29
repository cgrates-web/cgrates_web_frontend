# jshint expr:true
import Ember from 'ember'
import { describe } from 'mocha'
import { expect } from 'chai'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'

describe "Acceptance: TpFilters.Index", ->
  beforeEach ->
    @App = startApp()
    @tariffPlan = server.create 'tariff-plan', name: 'Test', alias: 'tptest'
    server.createList('tp-filter', 2, {tpid: @tariffPlan.alias})
    server.createList('tp-filter', 2, {tpid: 'other'})
    authenticateSession(@App, {email: "user@example.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'visit /tariff-plans/1/tp-filters', ->
    it "renders table with tp-filters", ->
      visit '/tariff-plans/1/tp-filters'
      andThen ->
        expect(find('main h2').text()).to.eq('Filters list')
        expect(find('table tbody tr').length).to.eq(2)

  describe 'select tp-filter', ->
    it 'reditects to tp-filter page', ->
      visit '/tariff-plans/1/tp-filters'
      click 'table tbody tr:first-child td:first-child a'
      andThen ->
        expect(currentPath()).to.equal "tariff-plans.tariff-plan.tp-filters.tp-filter.index"

  describe 'click edit button', ->
    it 'reditects to edit tp-filter page', ->
      visit '/tariff-plans/1/tp-filters'
      click 'table tbody tr:first-child a.edit'
      andThen ->
        expect(currentPath()).to.equal 'tariff-plans.tariff-plan.tp-filters.tp-filter.edit'

  describe 'click remove button', ->
    it 'removes tp-filter', ->
      visit '/tariff-plans/1/tp-filters'
      click 'table tbody tr:first-child a.remove'
      andThen ->
        expect(find('table tbody tr').length).to.eq(1)

  describe 'click add button', ->
    it 'redirects to new tp-filter page', ->
      visit '/tariff-plans/1/tp-filters'
      click '.fixed-action-btn a'
      andThen ->
        expect(currentPath()).to.equal 'tariff-plans.tariff-plan.tp-filters.new'

  describe 'set filters and click search button', ->
    it 'makes a correct filter query', ->
      counter = 0
      server.get('/tp-filters/', (schema, request) ->
        counter = counter + 1
        tenant = request.queryParams['filter[tenant]']
        id = request.queryParams['filter[id]']
        filterType = request.queryParams['filter[filter_type]']
        filterFieldName = request.queryParams['filter[filter_field_name]']
        activationInterval = request.queryParams['filter[activation_interval]']
        switch counter
          when 1
            expect(Ember.isBlank(tenant)).to.eq true
            expect(Ember.isBlank(id)).to.eq true
            expect(Ember.isBlank(filterType)).to.eq true
            expect(Ember.isBlank(filterFieldName)).to.eq true
            expect(Ember.isBlank(activationInterval)).to.eq true
          else
            expect(tenant).to.eq 'tagtest'
            expect(id).to.eq '60'
            expect(filterType).to.eq '*string'
            expect(filterFieldName).to.eq '0.01'
            expect(activationInterval).to.eq '0.01'
        return { data: [{id: '1', type: 'tp-filter'}] }
      )

      visit '/tariff-plans/1/tp-filters'
      andThen ->
        fillIn "##{find("label:contains('Tenant')").attr('for')}", 'tagtest'
        fillIn "##{find("label:contains('ID')").attr('for')}", '60'
        fillIn "##{find("label:contains('Filter field name')").attr('for')}", '0.01'
        fillIn "##{find("label:contains('Activation interval')").attr('for')}", '0.01'
        selectChoose '.fiter-type-select', '*string'
        click 'button.search-button'
        andThen ->
          expect(counter).to.eq 2

  describe 'click column header', ->
    it 'makes a correct sort query', ->
      counter = 0

      server.get('/tp-filters/', (schema, request) ->
        counter = counter + 1
        sort = request.queryParams['sort']
        switch counter
          when 1
            expect(sort).to.eq 'id'
          when 2
            expect(sort).to.eq 'tenant'
          else
            expect(sort).to.eq '-tenant'
        return { data: [{id: '1', type: 'tp-filter'}] }
      )

      visit '/tariff-plans/1/tp-filters'
      click ".sort-header a:contains('Tenant')"
      click ".sort-header a:contains('Tenant')"
      andThen ->
        expect(counter).to.eq 3

  describe 'click pagination link', ->
    it 'makes a correct pagination query', ->
      counter = 0

      server.get('/tp-filters/', (schema, request) ->
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
        return { data: [{id: '1', type: 'tp-filter'}], meta: {total_pages: 2} }
      )

      visit '/tariff-plans/1/tp-filters'
      click "ul.pagination li a:contains('2')"
      andThen ->
        expect(counter).to.eq 2
