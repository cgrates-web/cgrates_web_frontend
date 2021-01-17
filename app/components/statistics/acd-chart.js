import Component from '@glimmer/component';
import { prop, pipe } from 'ramda';
import timescale from 'timescale';

const nsToSec = (value) => timescale(value, 'ns', 's');

const getTotalUsageInSec = pipe(prop('usageAvg'), nsToSec);

export default class StatisticsCallsChart extends Component {
  get chartData() {
    return [
      {
        name: 'ACD',
        color: '#A5DEF9',
        data: this.args.cdrStats.map(getTotalUsageInSec),
      },
    ];
  }
}
