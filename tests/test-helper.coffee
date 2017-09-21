import resolver from './helpers/resolver'
import { setResolver } from 'ember-mocha'

mocha.setup({
  timeout: 20000,
  slow: 1000,
});

setResolver(resolver)
