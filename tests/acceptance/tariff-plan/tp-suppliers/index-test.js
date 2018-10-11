// TODO: rewrite test in YUFU-1828
// import { describe, it, beforeEach, afterEach } from 'mocha';
// import { expect } from 'chai';
// import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
// import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';
// import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth';
//
// describe("Acceptance: TpSuppliers.Index", function() {
//   beforeEach(function() {
//     this.App = startApp();
//     this.tariffPlan = server.create('tariff-plan', {name: 'Test', alias: 'tptest'});
//     server.createList('tp-supplier', 2, {tpid: this.tariffPlan.alias});
//     authenticateSession(this.App, {email: "user@example.com"});
//   });
//
//   afterEach(function () {
//     destroyApp(this.App);
//   });
//
//   describe('visit /tariff-plans/1/tp-suppliers', () =>
//     it("renders table with tp-suppliers", function() {
//       visit('/tariff-plans/1/tp-suppliers');
//       return andThen(function() {
//         expect(find('main h2').text()).to.eq('Suppliers list');
//         return expect(find('table tbody tr').length).to.eq(2);
//       });
//     })
//   );
//
//   describe('select tp-supplier', () =>
//     it('reditects to tp-supplier page', function() {
//       visit('/tariff-plans/1/tp-suppliers');
//       click('table tbody tr:first-child td:first-child a');
//       return andThen(() => expect(currentPath()).to.equal("tariff-plans.tariff-plan.tp-suppliers.tp-supplier.index"));
//     })
//   );
//
//   describe('click edit button', () =>
//     it('reditects to edit tp-supplier page', function() {
//       visit('/tariff-plans/1/tp-suppliers');
//       click('table tbody tr:first-child a.edit');
//       return andThen(() => expect(currentPath()).to.equal('tariff-plans.tariff-plan.tp-suppliers.tp-supplier.edit'));
//     })
//   );
//
//   describe('click remove button', () =>
//     it('removes tp-supplier', function() {
//       visit('/tariff-plans/1/tp-suppliers');
//       click('table tbody tr:first-child a.remove');
//       return andThen(() => expect(find('table tbody tr').length).to.eq(1));
//     })
//   );
//
//   describe('click add button', () =>
//     it('redirects to new tp-supplier page', function() {
//       visit('/tariff-plans/1/tp-suppliers');
//       click('.fixed-action-btn a');
//       return andThen(() => expect(currentPath()).to.equal('tariff-plans.tariff-plan.tp-suppliers.new'));
//     })
//   );
//
//   return describe('click pagination link', () =>
//     it('makes a correct pagination query', function() {
//       let counter = 0;
//
//       server.get('/tp-suppliers/', function(schema, request) {
//         counter = counter + 1;
//         const pagePage = request.queryParams['page[page]'];
//         const pagePageSize = request.queryParams['page[page-size]'];
//         switch (counter) {
//           case 1:
//             expect(pagePage).to.eq('1');
//             expect(pagePageSize).to.eq('10');
//             break;
//           default:
//             expect(pagePage).to.eq('2');
//             expect(pagePageSize).to.eq('10');
//         }
//         return { data: [{id: '1', type: 'tp-supplier'}], meta: {total_pages: 2} };
//       });
//
//       visit('/tariff-plans/1/tp-suppliers');
//       click("ul.pagination li a:contains('2')");
//       return andThen(() => expect(counter).to.eq(2));
//     })
//   );
// });
