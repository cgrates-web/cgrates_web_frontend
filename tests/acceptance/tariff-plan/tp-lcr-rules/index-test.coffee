# jshint expr:true
import Ember from 'ember'
import { describe } from 'mocha'
import { expect } from 'chai'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'
import registerPowerSelectHelpers from 'cgrates-web-frontend/tests/helpers/ember-power-select'

registerPowerSelectHelpers()

describe "Acceptance: TpLcrRules.Index", ->
  beforeEach ->
    @App = startApp()
    @tariffPlan = server.create 'tariff-plan', name: 'Test', alias: 'tptest'
    @tpLcrRules = server.createList('tp-lcr-rule', 2, {tpid: @tariffPlan.alias})
    @other = server.createList('tp-lcr-rule', 2, {tpid: 'other'})
    authenticateSession(@App, {email: "user@example.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'visit /tariff-plans/1/tp-lcr-rules', ->
    it "renders table with tp-lcr-rules", ->
      visit '/tariff-plans/1/tp-lcr-rules'
      andThen ->
        expect(find('main h2').text()).to.eq('TpLcrRules list')
        expect(find('table tbody tr').length).to.eq(2)

  describe 'select tp-lcr-rule', ->
    it 'reditects to tp-lcr-rule page', ->
      visit '/tariff-plans/1/tp-lcr-rules'
      click 'table tbody tr:first-child td:first-child a'
      andThen ->
        expect(currentPath()).to.equal "tariff-plans.tariff-plan.tp-lcr-rules.tp-lcr-rule.index"

  describe 'click edit button', ->
    it 'reditects to edit tp-lcr-rule page', ->
      visit '/tariff-plans/1/tp-lcr-rules'
      click 'table tbody tr:first-child a.edit'
      andThen ->
        expect(currentPath()).to.equal 'tariff-plans.tariff-plan.tp-lcr-rules.tp-lcr-rule.edit'

  describe 'click remove button', ->
    it 'removes tp-lcr-rule', ->
      visit '/tariff-plans/1/tp-lcr-rules'
      click 'table tbody tr:first-child a.remove'
      andThen ->
        expect(find('table tbody tr').length).to.eq(1)

  describe 'click add button', ->
    it 'redirects to new tp-lcr-rule page', ->
      visit '/tariff-plans/1/tp-lcr-rules'
      click '.fixed-action-btn a'
      andThen ->
        expect(currentPath()).to.equal 'tariff-plans.tariff-plan.tp-lcr-rules.new'

  describe 'set filters and click search button', ->
    it 'makes a correct filter query', ->
      counter = 0

      server.get('/tp-lcr-rules/', (schema, request) ->
        counter = counter + 1
        filterDirection = request.queryParams['filter[direction]']
        filterTenant = request.queryParams['filter[tenant]']
        filterCategory = request.queryParams['filter[category]']
        filterAccount = request.queryParams['filter[account]']
        filterSubject = request.queryParams['filter[subject]']
        filterDestinationTag = request.queryParams['filter[destination_tag]']
        filterRpCategory = request.queryParams['filter[rp_category]']
        filterStrategy = request.queryParams['filter[strategy]']
        switch counter
          when 1
            expect(Ember.isBlank(filterDirection)).to.eq true
            expect(Ember.isBlank(filterTenant)).to.eq true
            expect(Ember.isBlank(filterCategory)).to.eq true
            expect(Ember.isBlank(filterAccount)).to.eq true
            expect(Ember.isBlank(filterSubject)).to.eq true
            expect(Ember.isBlank(filterDestinationTag)).to.eq true
            expect(Ember.isBlank(filterRpCategory)).to.eq true
            expect(Ember.isBlank(filterStrategy)).to.eq true
          else
            expect(filterDirection).to.eq '*out'
            expect(filterTenant).to.eq 'cgrates'
            expect(filterCategory).to.eq 'call'
            expect(filterAccount).to.eq 'any'
            expect(filterSubject).to.eq 'any'
            expect(filterDestinationTag).to.eq '1001'
            expect(filterRpCategory).to.eq 'profile1'
            expect(filterStrategy).to.eq '*static'
        return { data: [{id: '1', type: 'tp-lcr-rule'}] }
      )

      visit '/tariff-plans/1/tp-lcr-rules'
      andThen ->
        selectChoose "##{find("label:contains('Direction')").attr('for')}", '*out'
        fillIn "##{find("label:contains('Tenant')").attr('for')}", 'cgrates'
        fillIn "##{find("label:contains('Category')").attr('for')}", 'call'
        fillIn "##{find("label:contains('Account')").attr('for')}", 'any'
        fillIn "##{find("label:contains('Subject')").attr('for')}", 'any'
        fillIn "##{find("label:contains('Destination tag')").attr('for')}", '1001'
        fillIn "##{find("label:contains('RP category')").attr('for')}", 'profile1'
        selectChoose "##{find("label:contains('Strategy')").attr('for')}", '*static'
        click 'button.search-button'
        andThen ->
          expect(counter).to.eq 2

  describe 'click column header', ->
    it 'makes a correct sort query', ->
      counter = 0

      server.get('/tp-lcr-rules/', (schema, request) ->
        counter = counter + 1
        sort = request.queryParams['sort']
        switch counter
          when 1
            expect(sort).to.eq 'id'
          when 2
            expect(sort).to.eq 'destination_tag'
          else
            expect(sort).to.eq '-destination_tag'
        return { data: [{id: '1', type: 'tp-lcr-rule'}] }
      )

      visit '/tariff-plans/1/tp-lcr-rules'
      click ".sort-header a:contains('Destination tag')"
      click ".sort-header a:contains('Destination tag')"
      andThen ->
        expect(counter).to.eq 3

  describe 'click pagination link', ->
    it 'makes a correct pagination query', ->
      counter = 0

      server.get('/tp-lcr-rules/', (schema, request) ->
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
        return { data: [{id: '1', type: 'tp-lcr-rule'}], meta: {total_pages: 2} }
      )

      visit '/tariff-plans/1/tp-lcr-rules'
      click "ul.pagination li a:contains('2')"
      andThen ->
        expect(counter).to.eq 2
