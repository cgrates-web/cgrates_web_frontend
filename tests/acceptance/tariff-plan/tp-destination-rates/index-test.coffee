# jshint expr:true
import Ember from 'ember'
import { describe } from 'mocha'
import { expect } from 'chai'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'
import registerPowerSelectHelpers from 'cgrates-web-frontend/tests/helpers/ember-power-select'

registerPowerSelectHelpers()

describe "Acceptance: TpDestinationRates.Index", ->
  beforeEach ->
    @App = startApp()
    @tariffPlan = server.create 'tariff-plan', name: 'Test', alias: 'tptest'
    @tpDestinationRates = server.createList('tp-destination-rate', 2, {tpid: @tariffPlan.alias})
    @other = server.createList('tp-destination-rate', 2, {tpid: 'other'})
    authenticateSession(@App, {email: "user@example.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'visit /tariff-plans/1/tp-destination-rates', ->
    it "renders table with tp-destination-rates", ->
      visit '/tariff-plans/1/tp-destination-rates'
      andThen ->
        expect(find('main h2').text()).to.eq('TpDestinationRates list')
        expect(find('table tbody tr').length).to.eq(2)

  describe 'select tp-destination-rate', ->
    it 'reditects to tp-destination-rate page', ->
      visit '/tariff-plans/1/tp-destination-rates'
      click 'table tbody tr:first-child td:first-child a'
      andThen ->
        expect(currentPath()).to.equal "tariff-plans.tariff-plan.tp-destination-rates.tp-destination-rate.index"

  describe 'click edit button', ->
    it 'reditects to edit tp-destination-rate page', ->
      visit '/tariff-plans/1/tp-destination-rates'
      click 'table tbody tr:first-child a.edit'
      andThen ->
        expect(currentPath()).to.equal 'tariff-plans.tariff-plan.tp-destination-rates.tp-destination-rate.edit'

  describe 'click remove button', ->
    it 'removes tp-destination-rate', ->
      visit '/tariff-plans/1/tp-destination-rates'
      click 'table tbody tr:first-child a.remove'
      andThen ->
        expect(find('table tbody tr').length).to.eq(1)

  describe 'click add button', ->
    it 'redirects to new tp-destination-rate page', ->
      visit '/tariff-plans/1/tp-destination-rates'
      click '.fixed-action-btn a'
      andThen ->
        expect(currentPath()).to.equal 'tariff-plans.tariff-plan.tp-destination-rates.new'

  describe 'set filters and click search button', ->
    it 'makes a correct filter query', ->
      counter = 0

      server.get('/tp-destination-rates/', (schema, request) ->
        counter = counter + 1
        filterTag = request.queryParams['filter[tag]']
        filterRatesTag = request.queryParams['filter[rates_tag]']
        filterDestinationsTag = request.queryParams['filter[destinations_tag]']
        filterRoundingDecimals = request.queryParams['filter[rounding_decimals]']
        filterMaxCost = request.queryParams['filter[max_cost]']
        filterRoundingMethod = request.queryParams['filter[rounding_method]']
        filterMaxCostStrategy = request.queryParams['filter[max_cost_strategy]']
        switch counter
          when 1
            expect(Ember.isBlank(filterTag)).to.eq true
            expect(Ember.isBlank(filterRatesTag)).to.eq true
            expect(Ember.isBlank(filterDestinationsTag)).to.eq true
            expect(Ember.isBlank(filterRoundingDecimals)).to.eq true
            expect(Ember.isBlank(filterMaxCost)).to.eq true
            expect(Ember.isBlank(filterRoundingMethod)).to.eq true
            expect(Ember.isBlank(filterMaxCostStrategy)).to.eq true

          else
            expect(filterTag).to.eq 'tagtest'
            expect(filterRatesTag).to.eq 'ratetest'
            expect(filterDestinationsTag).to.eq 'destinationtest'
            expect(filterRoundingDecimals).to.eq '1'
            expect(filterMaxCost).to.eq '100.0'
            expect(filterRoundingMethod).to.eq '*up'
            expect(filterMaxCostStrategy).to.eq '*free'
        return { data: [{id: '1', type: 'tp-destination-rate'}] }
      )

      visit '/tariff-plans/1/tp-destination-rates'
      andThen ->
        fillIn "##{find("label:contains('Tag')").attr('for')}", 'tagtest'
        fillIn "##{find("label:contains('Rates tag')").attr('for')}", 'ratetest'
        fillIn "##{find("label:contains('Destinations tag')").attr('for')}", 'destinationtest'
        fillIn "##{find("label:contains('Rounding decimals')").attr('for')}", '1'
        fillIn "##{find("label:contains('Max cost (decimal)')").attr('for')}", '100.0'
        selectChoose "##{find("label:contains('Rounding method')").attr('for')}", '*up'
        selectChoose "##{find("label:contains('Max cost strategy')").attr('for')}", '*free'
        click 'button.search-button'
        andThen ->
          expect(counter).to.eq 2

  describe 'click column header', ->
    it 'makes a correct sort query', ->
      counter = 0

      server.get('/tp-destination-rates/', (schema, request) ->
        counter = counter + 1
        sort = request.queryParams['sort']
        switch counter
          when 1
            expect(sort).to.eq 'id'
          when 2
            expect(sort).to.eq 'tag'
          else
            expect(sort).to.eq '-tag'
        return { data: [{id: '1', type: 'tp-destination-rate'}] }
      )

      visit '/tariff-plans/1/tp-destination-rates'
      click ".sort-header a:contains('Tag')"
      click ".sort-header a:contains('Tag')"
      andThen ->
        expect(counter).to.eq 3

  describe 'click pagination link', ->
    it 'makes a correct pagination query', ->
      counter = 0

      server.get('/tp-destination-rates/', (schema, request) ->
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
        return { data: [{id: '1', type: 'tp-destination-rate'}], meta: {total_pages: 2} }
      )

      visit '/tariff-plans/1/tp-destination-rates'
      click "ul.pagination li a:contains('2')"
      andThen ->
        expect(counter).to.eq 2
