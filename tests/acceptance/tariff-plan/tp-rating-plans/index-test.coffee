# jshint expr:true
import Ember from 'ember'
import { describe } from 'mocha'
import { expect } from 'chai'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'
import registerPowerSelectHelpers from 'cgrates-web-frontend/tests/helpers/ember-power-select'

registerPowerSelectHelpers()

describe "Acceptance: TpRatingPlans.Index", ->
  beforeEach ->
    @App = startApp()
    @tariffPlan = server.create 'tariff-plan', name: 'Test', alias: 'tptest'
    @tpRatingPlans = server.createList('tp-rating-plan', 2, {tpid: @tariffPlan.alias})
    @other = server.createList('tp-rating-plan', 2, {tpid: 'other'})
    authenticateSession(@App, {email: "user@example.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'visit /tariff-plans/1/tp-rating-plans', ->
    it "renders table with tp-rating-plans", ->
      visit '/tariff-plans/1/tp-rating-plans'
      andThen ->
        expect(find('main h2').text()).to.eq('TpRatingPlans list')
        expect(find('table tbody tr').length).to.eq(2)

  describe 'select tp-rating-plan', ->
    it 'reditects to tp-rating-plan page', ->
      visit '/tariff-plans/1/tp-rating-plans'
      click 'table tbody tr:first-child td:first-child a'
      andThen ->
        expect(currentPath()).to.equal "tariff-plans.tariff-plan.tp-rating-plans.tp-rating-plan.index"

  describe 'click edit button', ->
    it 'reditects to edit tp-rating-plan page', ->
      visit '/tariff-plans/1/tp-rating-plans'
      click 'table tbody tr:first-child a.edit'
      andThen ->
        expect(currentPath()).to.equal 'tariff-plans.tariff-plan.tp-rating-plans.tp-rating-plan.edit'

  describe 'click remove button', ->
    it 'removes tp-rating-plan', ->
      visit '/tariff-plans/1/tp-rating-plans'
      click 'table tbody tr:first-child a.remove'
      andThen ->
        expect(find('table tbody tr').length).to.eq(1)

  describe 'click add button', ->
    it 'redirects to new tp-rating-plan page', ->
      visit '/tariff-plans/1/tp-rating-plans'
      click '.fixed-action-btn a'
      andThen ->
        expect(currentPath()).to.equal 'tariff-plans.tariff-plan.tp-rating-plans.new'

  describe 'set filters and click search button', ->
    it 'makes a correct filter query', ->
      counter = 0

      server.get('/tp-rating-plans/', (schema, request) ->
        counter = counter + 1
        filterTag = request.queryParams['filter[tag]']
        filterDestratesTag = request.queryParams['filter[destrates_tag]']
        filterTimingTag = request.queryParams['filter[timing_tag]']
        filterWeight = request.queryParams['filter[weight]']
        switch counter
          when 1
            expect(Ember.isBlank(filterTag)).to.eq true
            expect(Ember.isBlank(filterDestratesTag)).to.eq true
            expect(Ember.isBlank(filterTimingTag)).to.eq true
            expect(Ember.isBlank(filterWeight)).to.eq true

          else
            expect(filterTag).to.eq 'tagtest'
            expect(filterDestratesTag).to.eq 'destratetest'
            expect(filterTimingTag).to.eq 'timingtest'
            expect(filterWeight).to.eq '12.1'
        return { data: [{id: '1', type: 'tp-rating-plan'}] }
      )

      visit '/tariff-plans/1/tp-rating-plans'
      andThen ->
        fillIn "##{find("label:contains('Tag')").attr('for')}", 'tagtest'
        fillIn "##{find("label:contains('Destination rates tag')").attr('for')}", 'destratetest'
        fillIn "##{find("label:contains('Timing tag')").attr('for')}", 'timingtest'
        fillIn "##{find("label:contains('Weight')").attr('for')}", '12.1'
        click 'button.search-button'
        andThen ->
          expect(counter).to.eq 2

  describe 'click column header', ->
    it 'makes a correct sort query', ->
      counter = 0

      server.get('/tp-rating-plans/', (schema, request) ->
        counter = counter + 1
        sort = request.queryParams['sort']
        switch counter
          when 1
            expect(sort).to.eq 'id'
          when 2
            expect(sort).to.eq 'tag'
          else
            expect(sort).to.eq '-tag'
        return { data: [{id: '1', type: 'tp-rating-plan'}] }
      )

      visit '/tariff-plans/1/tp-rating-plans'
      click ".sort-header a:contains('Tag')"
      click ".sort-header a:contains('Tag')"
      andThen ->
        expect(counter).to.eq 3

  describe 'click pagination link', ->
    it 'makes a correct pagination query', ->
      counter = 0

      server.get('/tp-rating-plans/', (schema, request) ->
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
        return { data: [{id: '1', type: 'tp-rating-plan'}], meta: {total_pages: 2} }
      )

      visit '/tariff-plans/1/tp-rating-plans'
      click "ul.pagination li a:contains('2')"
      andThen ->
        expect(counter).to.eq 2
