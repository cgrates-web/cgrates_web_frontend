# jshint expr:true
import Ember from 'ember'
import { describe } from 'mocha'
import { expect } from 'chai'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'
import registerPowerSelectHelpers from 'cgrates-web-frontend/tests/helpers/ember-power-select'

registerPowerSelectHelpers()

describe "Acceptance: TpActionPlans.Index", ->
  beforeEach ->
    @App = startApp()
    @tariffPlan = server.create 'tariff-plan', name: 'Test', alias: 'tptest'
    @tpActionPlans = server.createList('tp-action-plan', 2, {tpid: @tariffPlan.alias})
    @other = server.createList('tp-action-plan', 2, {tpid: 'other'})
    authenticateSession(@App, {email: "user@example.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'visit /tariff-plans/1/tp-action-plans', ->
    it "renders table with tp-action-plans", ->
      visit '/tariff-plans/1/tp-action-plans'
      andThen ->
        expect(find('main h2').text()).to.eq('TpActionPlans list')
        expect(find('table tbody tr').length).to.eq(2)

  describe 'select tp-action-plan', ->
    it 'reditects to tp-action-plan page', ->
      visit '/tariff-plans/1/tp-action-plans'
      click 'table tbody tr:first-child td:first-child a'
      andThen ->
        expect(currentPath()).to.equal "tariff-plans.tariff-plan.tp-action-plans.tp-action-plan.index"

  describe 'click edit button', ->
    it 'reditects to edit tp-action-plan page', ->
      visit '/tariff-plans/1/tp-action-plans'
      click 'table tbody tr:first-child a.edit'
      andThen ->
        expect(currentPath()).to.equal 'tariff-plans.tariff-plan.tp-action-plans.tp-action-plan.edit'

  describe 'click remove button', ->
    it 'removes tp-action-plan', ->
      visit '/tariff-plans/1/tp-action-plans'
      click 'table tbody tr:first-child a.remove'
      andThen ->
        expect(find('table tbody tr').length).to.eq(1)

  describe 'click add button', ->
    it 'redirects to new tp-action-plan page', ->
      visit '/tariff-plans/1/tp-action-plans'
      click '.fixed-action-btn a'
      andThen ->
        expect(currentPath()).to.equal 'tariff-plans.tariff-plan.tp-action-plans.new'

  describe 'set filters and click search button', ->
    it 'makes a correct filter query', ->
      counter = 0

      server.get('/tp-action-plans/', (schema, request) ->
        counter = counter + 1
        filterTag = request.queryParams['filter[tag]']
        filterActionsTag = request.queryParams['filter[actions_tag]']
        filterTimingTag = request.queryParams['filter[timing_tag]']
        filterWeight = request.queryParams['filter[weight]']
        switch counter
          when 1
            expect(Ember.isBlank(filterTag)).to.eq true
            expect(Ember.isBlank(filterActionsTag)).to.eq true
            expect(Ember.isBlank(filterTimingTag)).to.eq true
            expect(Ember.isBlank(filterWeight)).to.eq true
          else
            expect(filterTag).to.eq 'tagtest'
            expect(filterActionsTag).to.eq 'actionstagtest'
            expect(filterTimingTag).to.eq 'timingtagtest'
            expect(filterWeight).to.eq '10'
        return { data: [{id: '1', type: 'tp-action-plan'}] }
      )

      visit '/tariff-plans/1/tp-action-plans'
      andThen ->
        fillIn "##{find("label:contains('Tag')").attr('for')}", 'tagtest'
        fillIn "##{find("label:contains('Actions tag')").attr('for')}", 'actionstagtest'
        fillIn "##{find("label:contains('Timing tag')").attr('for')}", 'timingtagtest'
        fillIn "##{find("label:contains('Weight')").attr('for')}", '10'
        click 'button.search-button'
        andThen ->
          expect(counter).to.eq 2

  describe 'click column header', ->
    it 'makes a correct sort query', ->
      counter = 0

      server.get('/tp-action-plans/', (schema, request) ->
        counter = counter + 1
        sort = request.queryParams['sort']
        switch counter
          when 1
            expect(sort).to.eq 'id'
          when 2
            expect(sort).to.eq 'tag'
          else
            expect(sort).to.eq '-tag'
        return { data: [{id: '1', type: 'tp-action-plan'}] }
      )

      visit '/tariff-plans/1/tp-action-plans'
      click ".sort-header a:contains('Tag')"
      click ".sort-header a:contains('Tag')"
      andThen ->
        expect(counter).to.eq 3

  describe 'click pagination link', ->
    it 'makes a correct pagination query', ->
      counter = 0

      server.get('/tp-action-plans/', (schema, request) ->
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
        return { data: [{id: '1', type: 'tp-action-plan'}], meta: {total_pages: 2} }
      )

      visit '/tariff-plans/1/tp-action-plans'
      click "ul.pagination li a:contains('2')"
      andThen ->
        expect(counter).to.eq 2
