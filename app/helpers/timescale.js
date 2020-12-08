import { helper } from '@ember/component/helper';
import timescale from 'timescale';

export default helper((args) => timescale(...args));
