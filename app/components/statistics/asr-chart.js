import Component from '@glimmer/component';
import { prop } from 'ramda';

export default class StatisticsCallsChart extends Component {
  get chartData() {
    return [
      {
        name: 'ASR',
        color: '#018CEB',
        data: this.args.cdrStats.map(prop('asr')),
      },
    ];
  }
}
