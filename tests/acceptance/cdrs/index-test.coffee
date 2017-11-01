# jshint expr:true
import Ember from 'ember'
import { describe } from 'mocha'
import { expect } from 'chai'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'
import registerPowerSelectHelpers from 'cgrates-web-frontend/tests/helpers/ember-power-select'

registerPowerSelectHelpers()

describe "Acceptance: Cdrs.Index", ->
  beforeEach ->
    @App = startApp()
    @cdrs = server.createList('cdr', 2)
    authenticateSession(@App, {email: "user@example.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'visit /cdrs', ->
    it "renders table with CDRs", ->
      visit "/cdrs"
      andThen ->
        expect(find('section.page-header h1').text()).to.eq('CDRs')
        expect(find('table tbody tr').length).to.eq(2)

  describe 'select CDR', ->
    it 'reditects to CDR page', ->
      visit '/cdrs'
      click 'table tbody tr:first-child td:first-child a'
      andThen ->
        expect(currentPath()).to.equal "cdrs.cdr"

  describe 'set filters and click search button', ->
    it 'makes a correct filter query', ->
      counter = 0

      server.get('/cdrs/', (schema, request) ->
        counter = counter + 1
        filterCgrid = request.queryParams['filter[cgrid]']
        filterRunId = request.queryParams['filter[run_id]']
        filterOriginHost = request.queryParams['filter[origin_host]']
        filterSource = request.queryParams['filter[source]']
        filterOriginId = request.queryParams['filter[origin_id]']
        filterTor = request.queryParams['filter[tor]']
        filterDirection = request.queryParams['filter[direction]']
        filterTenant = request.queryParams['filter[tenant]']
        filterCategory = request.queryParams['filter[category]']
        filterAccount = request.queryParams['filter[account]']
        filterDestination = request.queryParams['filter[destination]']
        switch counter
          when 1
            expect(Ember.isBlank(filterCgrid)).to.eq true
            expect(Ember.isBlank(filterRunId)).to.eq true
            expect(Ember.isBlank(filterOriginHost)).to.eq true
            expect(Ember.isBlank(filterSource)).to.eq true
            expect(Ember.isBlank(filterOriginId)).to.eq true
            expect(Ember.isBlank(filterTor)).to.eq true
            expect(Ember.isBlank(filterDirection)).to.eq true
            expect(Ember.isBlank(filterTenant)).to.eq true
            expect(Ember.isBlank(filterCategory)).to.eq true
            expect(Ember.isBlank(filterAccount)).to.eq true
            expect(Ember.isBlank(filterDestination)).to.eq true
          else
            expect(filterCgrid).to.eq 'cgridtest'
            expect(filterRunId).to.eq '*default'
            expect(filterOriginHost).to.eq '0.0.0.0'
            expect(filterSource).to.eq 'sourcetest'
            expect(filterOriginId).to.eq 'originidtest'
            expect(filterTor).to.eq '*voice'
            expect(filterDirection).to.eq '*out'
            expect(filterTenant).to.eq 'tenanttest'
            expect(filterCategory).to.eq 'call'
            expect(filterAccount).to.eq 'accounttest'
            expect(filterDestination).to.eq '+3334445555'
        return { data: [{id: '1', type: 'cdr'}] }
      )

      visit '/cdrs'
      andThen ->
        fillIn "##{find("label:contains('CGRateS ID')").attr('for')}", 'cgridtest'
        fillIn "##{find("label:contains('Run ID')").attr('for')}", '*default'
        fillIn "##{find("label:contains('Origin Host')").attr('for')}", '0.0.0.0'
        fillIn "##{find("label:contains('Source')").attr('for')}", 'sourcetest'
        fillIn "##{find("label:contains('Origin ID')").attr('for')}", 'originidtest'
        selectChoose "##{find("label:contains('Type of record')").attr('for')}", '*voice'
        selectChoose "##{find("label:contains('Direction')").attr('for')}", '*out'
        fillIn "##{find("label:contains('Tenant')").attr('for')}", 'tenanttest'
        fillIn "##{find("label:contains('Category')").attr('for')}", 'call'
        fillIn "##{find("label:contains('Account')").attr('for')}", 'accounttest'
        fillIn "##{find("label:contains('Destination')").attr('for')}", '+3334445555'
        click 'button.search-button'
        andThen ->
          expect(counter).to.eq 2

  describe 'click column header', ->
    it 'makes a correct sort query', ->
      counter = 0

      server.get('/cdrs/', (schema, request) ->
        counter = counter + 1
        sort = request.queryParams['sort']
        switch counter
          when 1
            expect(sort).to.eq 'id'
          when 2
            expect(sort).to.eq 'cgrid'
          else
            expect(sort).to.eq '-cgrid'
        return { data: [{id: '1', type: 'cdr'}] }
      )

      visit '/cdrs'
      click ".sort-header a:contains('CGRateS ID')"
      click ".sort-header a:contains('CGRateS ID')"
      andThen ->
        expect(counter).to.eq 3

  describe 'click pagination link', ->
    it 'makes a correct pagination query', ->
      counter = 0

      server.get('/cdrs/', (schema, request) ->
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
        return { data: [{id: '1', type: 'cdr'}], meta: {total_pages: 2} }
      )

      visit '/cdrs'
      click "ul.pagination li a:contains('2')"
      andThen ->
        expect(counter).to.eq 2
