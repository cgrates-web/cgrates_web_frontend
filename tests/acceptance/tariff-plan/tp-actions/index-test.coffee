# jshint expr:true
import Ember from 'ember'
import { describe } from 'mocha'
import { expect } from 'chai'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'
import registerPowerSelectHelpers from 'cgrates-web-frontend/tests/helpers/ember-power-select'

registerPowerSelectHelpers()

describe "Acceptance: TpActions.Index", ->
  beforeEach ->
    @App = startApp()
    @tariffPlan = server.create 'tariff-plan', name: 'Test', alias: 'tptest'
    @tpActions = server.createList('tp-action', 2, {tpid: @tariffPlan.alias})
    @other = server.createList('tp-action', 2, {tpid: 'other'})
    authenticateSession(@App, {email: "user@example.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'visit /tariff-plans/1/tp-actions', ->
    it "renders table with tp-actions", ->
      visit '/tariff-plans/1/tp-actions'
      andThen ->
        expect(find('main h2').text()).to.eq('TpActions list')
        expect(find('table tbody tr').length).to.eq(2)

  describe 'select tp-action', ->
    it 'reditects to tp-action page', ->
      visit '/tariff-plans/1/tp-actions'
      click 'table tbody tr:first-child td:first-child a'
      andThen ->
        expect(currentPath()).to.equal "tariff-plans.tariff-plan.tp-actions.tp-action.index"

  describe 'click edit button', ->
    it 'reditects to edit tp-action page', ->
      visit '/tariff-plans/1/tp-actions'
      click 'table tbody tr:first-child a.edit'
      andThen ->
        expect(currentPath()).to.equal 'tariff-plans.tariff-plan.tp-actions.tp-action.edit'

  describe 'click remove button', ->
    it 'removes tp-action', ->
      visit '/tariff-plans/1/tp-actions'
      click 'table tbody tr:first-child a.remove'
      andThen ->
        expect(find('table tbody tr').length).to.eq(1)

  describe 'click add button', ->
    it 'redirects to new tp-action page', ->
      visit '/tariff-plans/1/tp-actions'
      click '.fixed-action-btn a'
      andThen ->
        expect(currentPath()).to.equal 'tariff-plans.tariff-plan.tp-actions.new'

  describe 'set filters and click search button', ->
    it 'makes a correct filter query', ->
      counter = 0

      server.get('/tp-actions/', (schema, request) ->
        counter = counter + 1
        filterTag = request.queryParams['filter[tag]']
        filterAction = request.queryParams['filter[action]']
        filterBalanceTag = request.queryParams['filter[balance_tag]']
        filterBalanceType = request.queryParams['filter[balance_type]']
        filterDirections = request.queryParams['filter[directions]']
        filterUnits = request.queryParams['filter[units]']
        filterExpiryTime = request.queryParams['filter[expiry_time]']
        filterTimingTags = request.queryParams['filter[timing_tags]']
        filterDestinationTags = request.queryParams['filter[destination_tags]']
        filterRatingSubject = request.queryParams['filter[rating_subject]']
        filterCategories = request.queryParams['filter[categories]']
        filterSharedGroups = request.queryParams['filter[shared_groups]']
        filterBalanceWeight = request.queryParams['filter[balance_weight]']
        filterBalanceBlocker = request.queryParams['filter[balance_blocker]']
        filterBalanceDisabled = request.queryParams['filter[balance_disabled]']
        filterWeight = request.queryParams['filter[weight]']
        switch counter
          when 1
            expect(Ember.isBlank(filterTag)).to.eq true
            expect(Ember.isBlank(filterAction)).to.eq true
            expect(Ember.isBlank(filterBalanceTag)).to.eq true
            expect(Ember.isBlank(filterBalanceType)).to.eq true
            expect(Ember.isBlank(filterDirections)).to.eq true
            expect(Ember.isBlank(filterUnits)).to.eq true
            expect(Ember.isBlank(filterExpiryTime)).to.eq true
            expect(Ember.isBlank(filterTimingTags)).to.eq true
            expect(Ember.isBlank(filterDestinationTags)).to.eq true
            expect(Ember.isBlank(filterRatingSubject)).to.eq true
            expect(Ember.isBlank(filterCategories)).to.eq true
            expect(Ember.isBlank(filterSharedGroups)).to.eq true
            expect(Ember.isBlank(filterBalanceWeight)).to.eq true
            expect(Ember.isBlank(filterBalanceBlocker)).to.eq true
            expect(Ember.isBlank(filterBalanceDisabled)).to.eq true
            expect(Ember.isBlank(filterWeight)).to.eq true
          else
            expect(filterTag).to.eq 'tagtest'
            expect(filterAction).to.eq '*log'
            expect(filterBalanceTag).to.eq 'balancetest'
            expect(filterBalanceType).to.eq '*monetary'
            expect(filterDirections).to.eq '*out'
            expect(filterUnits).to.eq '120'
            expect(filterExpiryTime).to.eq '*unlimited'
            expect(filterTimingTags).to.eq 'timingtest'
            expect(filterDestinationTags).to.eq 'destinationtest'
            expect(filterRatingSubject).to.eq 'subjecttest'
            expect(filterCategories).to.eq 'categoriestest'
            expect(filterSharedGroups).to.eq 'groupstest'
            expect(filterBalanceWeight).to.eq '20'
            expect(filterBalanceBlocker).to.eq 'false'
            expect(filterBalanceDisabled).to.eq 'false'
            expect(filterWeight).to.eq '10'
        return { data: [{id: '1', type: 'tp-action'}] }
      )

      visit '/tariff-plans/1/tp-actions'
      andThen ->
        fillIn "##{find("label:contains('Tag')").attr('for')}", 'tagtest'
        selectChoose "##{find("label:contains('Action')").attr('for')}", '*log'
        fillIn "##{find("label:contains('Balance tag')").attr('for')}", 'balancetest'
        selectChoose "##{find("label:contains('Balance type')").attr('for')}", '*monetary'
        selectChoose "##{find("label:contains('Directions')").attr('for')}", '*out'
        fillIn "##{find("label:contains('Units')").attr('for')}", '120'
        fillIn "##{find("label:contains('Expiry time')").attr('for')}", '*unlimited'
        fillIn "##{find("label:contains('Timing tags')").attr('for')}", 'timingtest'
        fillIn "##{find("label:contains('Destination tags')").attr('for')}", 'destinationtest'
        fillIn "##{find("label:contains('Rating subject')").attr('for')}", 'subjecttest'
        fillIn "##{find("label:contains('Categories')").attr('for')}", 'categoriestest'
        fillIn "##{find("label:contains('Shared groups')").attr('for')}", 'groupstest'
        fillIn "##{find("label:contains('Balance weight')").attr('for')}", '20'
        selectChoose "##{find("label:contains('Balance blocker')").attr('for')}", 'false'
        selectChoose "##{find("label:contains('Balance disabled')").attr('for')}", 'false'
        fillIn "##{find("label:contains('Weight')").attr('for')}", '10'
        click 'button.search-button'
        andThen ->
          expect(counter).to.eq 2

  describe 'click column header', ->
    it 'makes a correct sort query', ->
      counter = 0

      server.get('/tp-actions/', (schema, request) ->
        counter = counter + 1
        sort = request.queryParams['sort']
        switch counter
          when 1
            expect(sort).to.eq 'id'
          when 2
            expect(sort).to.eq 'tag'
          else
            expect(sort).to.eq '-tag'
        return { data: [{id: '1', type: 'tp-action'}] }
      )

      visit '/tariff-plans/1/tp-actions'
      click ".sort-header a:contains('Tag')"
      click ".sort-header a:contains('Tag')"
      andThen ->
        expect(counter).to.eq 3

  describe 'click pagination link', ->
    it 'makes a correct pagination query', ->
      counter = 0

      server.get('/tp-actions/', (schema, request) ->
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
        return { data: [{id: '1', type: 'tp-action'}], meta: {total_pages: 2} }
      )

      visit '/tariff-plans/1/tp-actions'
      click "ul.pagination li a:contains('2')"
      andThen ->
        expect(counter).to.eq 2
