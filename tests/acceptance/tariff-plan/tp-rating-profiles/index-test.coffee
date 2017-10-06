# jshint expr:true
import Ember from 'ember'
import { describe } from 'mocha'
import { expect } from 'chai'
import startApp from 'cgrates-web-frontend/tests/helpers/start-app'
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'
import registerPowerSelectHelpers from 'cgrates-web-frontend/tests/helpers/ember-power-select'

registerPowerSelectHelpers()

describe "Acceptance: TpRatingProfiles.Index", ->
  beforeEach ->
    @App = startApp()
    @tariffPlan = server.create 'tariff-plan', name: 'Test', alias: 'tptest'
    @tpRatingProfiles = server.createList('tp-rating-profile', 2, {tpid: @tariffPlan.alias})
    @other = server.createList('tp-rating-profile', 2, {tpid: 'other'})
    authenticateSession(@App, {email: "user@example.com"})
    return

  afterEach ->
    Ember.run(@App, "destroy")

  describe 'visit /tariff-plans/1/tp-rating-profiles', ->
    it "renders table with tp-rating-profiles", ->
      visit '/tariff-plans/1/tp-rating-profiles'
      andThen ->
        expect(find('main h2').text()).to.eq('TpRatingProfiles list')
        expect(find('table tbody tr').length).to.eq(2)

  describe 'select tp-rating-profile', ->
    it 'reditects to tp-rating-profile page', ->
      visit '/tariff-plans/1/tp-rating-profiles'
      click 'table tbody tr:first-child td:first-child a'
      andThen ->
        expect(currentPath()).to.equal "tariff-plans.tariff-plan.tp-rating-profiles.tp-rating-profile.index"

  describe 'click edit button', ->
    it 'reditects to edit tp-rating-profile page', ->
      visit '/tariff-plans/1/tp-rating-profiles'
      click 'table tbody tr:first-child a.edit'
      andThen ->
        expect(currentPath()).to.equal 'tariff-plans.tariff-plan.tp-rating-profiles.tp-rating-profile.edit'

  describe 'click remove button', ->
    it 'removes tp-rating-profile', ->
      visit '/tariff-plans/1/tp-rating-profiles'
      click 'table tbody tr:first-child a.remove'
      andThen ->
        expect(find('table tbody tr').length).to.eq(1)

  describe 'click add button', ->
    it 'redirects to new tp-rating-profile page', ->
      visit '/tariff-plans/1/tp-rating-profiles'
      click '.fixed-action-btn a'
      andThen ->
        expect(currentPath()).to.equal 'tariff-plans.tariff-plan.tp-rating-profiles.new'

  describe 'set filters and click search button', ->
    it 'makes a correct filter query', ->
      counter = 0

      server.get('/tp-rating-profiles/', (schema, request) ->
        counter = counter + 1
        filterLoadid = request.queryParams['filter[loadid]']
        filterDirection = request.queryParams['filter[direction]']
        filterTenant = request.queryParams['filter[tenant]']
        filterCategory = request.queryParams['filter[category]']
        filterSubject = request.queryParams['filter[subject]']
        filterFallbackSubjects = request.queryParams['filter[fallback_subjects]']
        filterActivationTime = request.queryParams['filter[activation_time]']
        filterCdrStatQueueIds = request.queryParams['filter[cdr_stat_queue_ids]']
        filterRatingPlanTag = request.queryParams['filter[rating_plan_tag]']
        switch counter
          when 1
            expect(Ember.isBlank(filterLoadid)).to.eq true
            expect(Ember.isBlank(filterDirection)).to.eq true
            expect(Ember.isBlank(filterTenant)).to.eq true
            expect(Ember.isBlank(filterCategory)).to.eq true
            expect(Ember.isBlank(filterSubject)).to.eq true
            expect(Ember.isBlank(filterFallbackSubjects)).to.eq true
            expect(Ember.isBlank(filterActivationTime)).to.eq true
            expect(Ember.isBlank(filterCdrStatQueueIds)).to.eq true
            expect(Ember.isBlank(filterRatingPlanTag)).to.eq true
          else
            expect(filterLoadid).to.eq 'loadtest'
            expect(filterDirection).to.eq '*in'
            expect(filterTenant).to.eq 'tenanttest'
            expect(filterCategory).to.eq 'categorytest'
            expect(filterSubject).to.eq 'subject1'
            expect(filterFallbackSubjects).to.eq 'subject2'
            expect(filterActivationTime).to.eq 'activationtime'
            expect(filterCdrStatQueueIds).to.eq 'queuetest'
            expect(filterRatingPlanTag).to.eq 'ratingplan'
        return { data: [{id: '1', type: 'tp-rating-profile'}] }
      )

      visit '/tariff-plans/1/tp-rating-profiles'
      andThen ->
        fillIn "##{find("label:contains('Load ID')").attr('for')}", 'loadtest'
        selectChoose "##{find("label:contains('Direction')").attr('for')}", '*in'
        fillIn "##{find("label:contains('Tenant')").attr('for')}", 'tenanttest'
        fillIn "##{find("label:contains('Category')").attr('for')}", 'categorytest'
        fillIn "##{find("label:contains('Subject')").attr('for')}", 'subject1'
        fillIn "##{find("label:contains('Fallback subjects')").attr('for')}", 'subject2'
        fillIn "##{find("label:contains('Activation time')").attr('for')}", 'activationtime'
        fillIn "##{find("label:contains('CDR stat queue IDs')").attr('for')}", 'queuetest'
        fillIn "##{find("label:contains('Rating plan tag')").attr('for')}", 'ratingplan'
        click 'button.search-button'
        andThen ->
          expect(counter).to.eq 2

  describe 'click column header', ->
    it 'makes a correct sort query', ->
      counter = 0

      server.get('/tp-rating-profiles/', (schema, request) ->
        counter = counter + 1
        sort = request.queryParams['sort']
        switch counter
          when 1
            expect(sort).to.eq 'id'
          when 2
            expect(sort).to.eq 'tenant'
          else
            expect(sort).to.eq '-tenant'
        return { data: [{id: '1', type: 'tp-rating-profile'}] }
      )

      visit '/tariff-plans/1/tp-rating-profiles'
      click ".sort-header a:contains('Tenant')"
      click ".sort-header a:contains('Tenant')"
      andThen ->
        expect(counter).to.eq 3

  describe 'click pagination link', ->
    it 'makes a correct pagination query', ->
      counter = 0

      server.get('/tp-rating-profiles/', (schema, request) ->
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
        return { data: [{id: '1', type: 'tp-rating-profile'}], meta: {total_pages: 2} }
      )

      visit '/tariff-plans/1/tp-rating-profiles'
      click "ul.pagination li a:contains('2')"
      andThen ->
        expect(counter).to.eq 2
