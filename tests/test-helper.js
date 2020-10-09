import Application from '../app';
import config from '../config/environment';
import { setApplication } from '@ember/test-helpers';
import './helpers/flash-message';
import { mocha } from 'mocha';

mocha.setup({
  timeout: 200000,
  slow: 2000,
});
setApplication(Application.create(config.APP));
