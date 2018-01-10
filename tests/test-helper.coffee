import resolver from './helpers/resolver'
import { setResolver } from 'ember-mocha'

mocha.setup
  timeout: 200000
  slow:    2000

setResolver(resolver)
