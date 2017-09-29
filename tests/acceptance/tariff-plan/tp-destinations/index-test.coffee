# jshint expr:true
import Ember from 'ember'
import { describe } from 'mocha'
import { expect } from 'chai'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'

describe "Acceptance: TpDestinations.Index", ->
  beforeEach ->
    @App = startApp()
    @tariffPlan = server.create 'tariff-plan', name: 'Test', alias: 'tptest'
    @tpDestinations = server.createList('tp-destination', 2, {tpid: @tariffPlan.alias})
    @other = server.createList('tp-destination', 2, {tpid: 'other'})
    authenticateSession(@App, {email: "user@example.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'visit /tariff-plans/1/tp-destinations', ->
    it "renders table with tp-destinations", ->
      visit '/tariff-plans/1/tp-destinations'
      andThen ->
        expect(find('main h2').text()).to.eq('TpDestinations list')
        expect(find('table tbody tr').length).to.eq(2)

  describe 'select tp-destination', ->
    it 'reditects to tp-destination page', ->
      visit '/tariff-plans/1/tp-destinations'
      click 'table tbody tr:first-child td:first-child a'
      andThen ->
        expect(currentPath()).to.equal "tariff-plans.tariff-plan.tp-destinations.tp-destination.index"

  describe 'click edit button', ->
    it 'reditects to edit tp-destination page', ->
      visit '/tariff-plans/1/tp-destinations'
      click 'table tbody tr:first-child a.edit'
      andThen ->
        expect(currentPath()).to.equal 'tariff-plans.tariff-plan.tp-destinations.tp-destination.edit'

  describe 'click remove button', ->
    it 'removes tp-destination', ->
      visit '/tariff-plans/1/tp-destinations'
      click 'table tbody tr:first-child a.remove'
      andThen ->
        expect(find('table tbody tr').length).to.eq(1)

  describe 'click add button', ->
    it 'redirects to new tp-destination page', ->
      visit '/tariff-plans/1/tp-destinations'
      click '.fixed-action-btn a'
      andThen ->
        expect(currentPath()).to.equal 'tariff-plans.tariff-plan.tp-destinations.new'

  describe 'set filters and click search button', ->
    it 'makes a correct filter query', ->
      counter = 0

      server.get('/tp-destinations/', (schema, request) ->
        counter = counter + 1
        filterTag = request.queryParams['filter[tag]']
        filterPrefix = request.queryParams['filter[prefix]']
        switch counter
          when 1
            expect(Ember.isBlank(filterTag)).to.eq true
            expect(Ember.isBlank(filterPrefix)).to.eq true
          else
            expect(filterTag).to.eq 'tagtest'
            expect(filterPrefix).to.eq '+44'
        return { data: [{id: '1', type: 'tp-destination'}] }
      )

      visit '/tariff-plans/1/tp-destinations'
      andThen ->
        fillIn "##{find("label:contains('Tag')").attr('for')}", 'tagtest'
        fillIn "##{find("label:contains('Prefix')").attr('for')}", '+44'
        click 'button.search-button'
        andThen ->
          expect(counter).to.eq 2

  describe 'click column header', ->
    it 'makes a correct sort query', ->
      counter = 0

      server.get('/tp-destinations/', (schema, request) ->
        counter = counter + 1
        sort = request.queryParams['sort']
        switch counter
          when 1
            expect(sort).to.eq 'id'
          else
            expect(sort).to.eq '-id'
        return { data: [{id: '1', type: 'tp-destination'}] }
      )

      visit '/tariff-plans/1/tp-destinations'
      click '.sort-header:first-child a'
      andThen ->
        expect(counter).to.eq 2

  describe 'click pagination link', ->
    it 'makes a correct pagination query', ->
      counter = 0

      server.get('/tp-destinations/', (schema, request) ->
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
        return { data: [{id: '1', type: 'tp-destination'}], meta: {total_pages: 2} }
      )

      visit '/tariff-plans/1/tp-destinations'
      click 'ul.pagination li:last-child a'
      andThen ->
        expect(counter).to.eq 2
