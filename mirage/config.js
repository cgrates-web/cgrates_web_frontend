export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  this.namespace = '/api';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  this.get('/destinations');
  this.del('/destinations/:id');

  this.get('tariff-plans');
  this.get('tariff-plans/:id');

  this.get('/users');
  this.get('/users/:id');
  this.del('/users/:id');

  this.get('/tp-destinations', function(db, request) {
    return db.tpDestinations.where({tpid: request.queryParams['tpid']});
  });
  this.get('/tp-destinations/:id');
  this.del('/tp-destinations/:id');
}
