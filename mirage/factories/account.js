import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  allowNegative:  false,
  disabled:       false,

  balanceMap() {
    return {
      '*monetary': [
        {
          'weight': 10,
          'value': 10,
          'uuid': faker.random.uuid(),
          'timings': null,
          'timing_i_ds': {},
          'shared_groups': {},
          'rating_subject': '',
          'id': '',
          'factor': null,
          'expiration_date': faker.date.future(),
          'disabled': false,
          'directions': {
            '*out': true
          },
          'destination_i_ds': {},
          'categories': {},
          'blocker': false
        }
      ]
    }
  },

  unitCounters()   { null  },
  actionTriggers() { null  }
});
