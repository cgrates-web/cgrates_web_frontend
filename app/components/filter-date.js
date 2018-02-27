import Component from '@ember/component';
import FilterComponentMixin from 'cgrates-web-frontend/mixins/filter-component-mixin';
import { observer } from '@ember/object'
import { isBlank } from '@ember/utils'
import moment from 'moment';

export default Component.extend(FilterComponentMixin, {
  valueChanged: observer('valueWrapper', function () {
    let formattedDate;
    if (isBlank(this.get('valueWrapper'))) {
      this.set('valueWrapper', null);
      formattedDate = null;
    } else {
      formattedDate = moment(this.get('valueWrapper')).utc().format();
    }
    
    if (this.get('value') !== formattedDate) {
      this.onValueChange(this.get('key'), formattedDate);
    }
  })
});
