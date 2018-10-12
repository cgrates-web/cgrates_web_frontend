// TODO: rewrite test in YUFU-1828
// import { expect } from 'chai';
// import { afterEach, beforeEach, describe, it } from 'mocha';
// import { setupApplicationTest } from 'ember-mocha';
// import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth';
//
// describe("Acceptance: Cdr.Index", function() {
//   setupApplicationTest();
//
//   beforeEach(function() {
//     this.cdr = server.create('cdr', {id: 777});
//     authenticateSession(this.App, {email: "user@example.com"});
//   });
//
//   return describe('basic rendering', () =>
//     it('renders specific header', function() {
//       visit('/cdrs');
//       click("table tbody tr:first-child td a:contains('777')");
//       return andThen(() => expect(find('section.page-header h1').text()).to.eq('CDR: 777'));
//     })
//   );
// });
