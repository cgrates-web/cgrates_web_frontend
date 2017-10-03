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
    let tag = request.queryParams['filter[tag]'];
    let records = db.tpDestinations.where({tpid: request.queryParams['tpid']});
    if(tag) {
      records = records.filter((record) => {
        return record.tag.includes(tag);
      });
    }
    return records;
  });
  this.get('/tp-destinations/:id');
  this.del('/tp-destinations/:id');

  this.get('/tp-rates', function(db, request) {
    let tag = request.queryParams['filter[tag]'];
    let records = db.tpRates.where({tpid: request.queryParams['tpid']});
    if(tag) {
      records = records.filter((record) => {
        return record.tag.includes(tag);
      });
    }
    return records;
  });
  this.get('/tp-rates/:id');
  this.del('/tp-rates/:id');

  this.get('/tp-destination-rates', function(db, request) {
    return db.tpDestinationRates.where({tpid: request.queryParams['tpid']});
  });
  this.get('/tp-destination-rates/:id');
  this.del('/tp-destination-rates/:id');
}
