import Component from '@glimmer/component';
import { prop } from 'ramda';

export default class StatisticsCallsChart extends Component {
  get chartData() {
    return [
      {
        name: 'Errors',
        color: '#FD4159',
        data: this.args.cdrStats.map(prop('unknownDisconnectsCount')),
      },
      {
        name: 'Normal Clearing',
        color: '#F3C635',
        data: this.args.cdrStats.map(prop('totalNormalClearingDisconnects')),
      },
      {
        name: 'Rejected',
        color: '#5863DF',
        data: this.args.cdrStats.map(prop('totalRejectedDisconnects')),
      },
      {
        name: 'Answered',
        color: '#00CB8C',
        data: this.args.cdrStats.map(prop('answeredCount')),
      },
    ];
  }
}
