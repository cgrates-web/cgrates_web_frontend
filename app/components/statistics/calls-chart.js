import Component from '@glimmer/component';
import { prop } from 'ramda';

export default class StatisticsCallsChart extends Component {
  get chartData() {
    return [
      {
        name: 'Answered',
        color: '#00CB8C',
        data: this.args.cdrStats.map(prop('answeredCount')),
      },
      {
        name: 'Errors',
        color: '#FD4159',
        data: this.args.cdrStats.map(prop('totalErrors')),
      },
    ];
  }
}
