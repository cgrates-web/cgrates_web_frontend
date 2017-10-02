# jshint expr:true
import Ember from 'ember'
import { describe } from 'mocha'
import { expect } from 'chai'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'

describe "Acceptance: TpRates.Index", ->
  beforeEach ->
    @App = startApp()
    @tariffPlan = server.create 'tariff-plan', name: 'Test', alias: 'tptest'
    @tpRates = server.createList('tp-rate', 2, {tpid: @tariffPlan.alias})
    @other = server.createList('tp-rate', 2, {tpid: 'other'})
    authenticateSession(@App, {email: "user@example.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'visit /tariff-plans/1/tp-rates', ->
    it "renders table with tp-rates", ->
      visit '/tariff-plans/1/tp-rates'
      andThen ->
        expect(find('main h2').text()).to.eq('TpRates list')
        expect(find('table tbody tr').length).to.eq(2)

  describe 'select tp-rate', ->
    it 'reditects to tp-rate page', ->
      visit '/tariff-plans/1/tp-rates'
      click 'table tbody tr:first-child td:first-child a'
      andThen ->
        expect(currentPath()).to.equal "tariff-plans.tariff-plan.tp-rates.tp-rate.index"

  describe 'click edit button', ->
    it 'reditects to edit tp-rate page', ->
      visit '/tariff-plans/1/tp-rates'
      click 'table tbody tr:first-child a.edit'
      andThen ->
        expect(currentPath()).to.equal 'tariff-plans.tariff-plan.tp-rates.tp-rate.edit'

  describe 'click remove button', ->
    it 'removes tp-rate', ->
      visit '/tariff-plans/1/tp-rates'
      click 'table tbody tr:first-child a.remove'
      andThen ->
        expect(find('table tbody tr').length).to.eq(1)

  describe 'click add button', ->
    it 'redirects to new tp-rate page', ->
      visit '/tariff-plans/1/tp-rates'
      click '.fixed-action-btn a'
      andThen ->
        expect(currentPath()).to.equal 'tariff-plans.tariff-plan.tp-rates.new'

  describe 'set filters and click search button', ->
    it 'makes a correct filter query', ->
      counter = 0

      server.get('/tp-rates/', (schema, request) ->
        counter = counter + 1
        filterTag = request.queryParams['filter[tag]']
        filterRateUnit = request.queryParams['filter[rate_unit]']
        filterRateIncrement = request.queryParams['filter[rate_increment]']
        filterRate = request.queryParams['filter[rate]']
        filterGroupIntervalStart = request.queryParams['filter[group_interval_start]']
        filterConnectFee = request.queryParams['filter[connect_fee]']
        switch counter
          when 1
            expect(Ember.isBlank(filterTag)).to.eq true
            expect(Ember.isBlank(filterRateUnit)).to.eq true
            expect(Ember.isBlank(filterRateIncrement)).to.eq true
            expect(Ember.isBlank(filterRate)).to.eq true
            expect(Ember.isBlank(filterGroupIntervalStart)).to.eq true
            expect(Ember.isBlank(filterConnectFee)).to.eq true
          else
            expect(filterTag).to.eq 'tagtest'
            expect(filterRateUnit).to.eq '60s'
            expect(filterRateIncrement).to.eq '60s'
            expect(filterRate).to.eq '0.01'
            expect(filterGroupIntervalStart).to.eq '60s'
            expect(filterConnectFee).to.eq '0.01'
        return { data: [{id: '1', type: 'tp-rate'}] }
      )

      visit '/tariff-plans/1/tp-rates'
      andThen ->
        fillIn "##{find("label:contains('Tag')").attr('for')}", 'tagtest'
        fillIn "##{find("label:contains('Rate unit')").attr('for')}", '60'
        fillIn "##{find("label:contains('Rate increment')").attr('for')}", '60'
        fillIn "##{find("label:contains('Rate (value)')").attr('for')}", '0.01'
        fillIn "##{find("label:contains('Group interval start')").attr('for')}", '60'
        fillIn "##{find("label:contains('Connect fee')").attr('for')}", '0.01'
        click 'button.search-button'
        andThen ->
          expect(counter).to.eq 2

  describe 'click column header', ->
    it 'makes a correct sort query', ->
      counter = 0

      server.get('/tp-rates/', (schema, request) ->
        counter = counter + 1
        sort = request.queryParams['sort']
        switch counter
          when 1
            expect(sort).to.eq 'id'
          else
            expect(sort).to.eq '-id'
        return { data: [{id: '1', type: 'tp-rate'}] }
      )

      visit '/tariff-plans/1/tp-rates'
      click '.sort-header:first-child a'
      andThen ->
        expect(counter).to.eq 2

  describe 'click pagination link', ->
    it 'makes a correct pagination query', ->
      counter = 0

      server.get('/tp-rates/', (schema, request) ->
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
        return { data: [{id: '1', type: 'tp-rate'}], meta: {total_pages: 2} }
      )

      visit '/tariff-plans/1/tp-rates'
      click 'ul.pagination li:last-child a'
      andThen ->
        expect(counter).to.eq 2
