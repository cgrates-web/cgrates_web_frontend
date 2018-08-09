import Service from '@ember/service';

export default Service.extend({
  action:          ['*allow_negative', '*call_url', '*call_url_async', '*cdrlog', '*debit',
                    '*deny_negative', '*disable_account', '*enable_account', '*log', '*mail_async',
                    '*reset_account', '*reset_counter', '*reset_counters', '*reset_triggers', '*set_recurrent',
                    '*topup', '*topup_reset', '*unset_recurrent', '*unlimited'],
  balanceType:     ['*monetary', '*data', '*sms', '*voice'],
  direction:       ['*in', '*out'],
  filterTypes:     ['*string', '*string_prefix', '*rsr_fields', '*destinations', '*gt', '*gte', '*lt', '*lte',
                    '*cdr_stats'],
  maxCostStrategy: ['*free', '*disconnect'],
  roundingMethod:  ['*up', '*down', '*middle'],
  strategy:        ['*static', '*lowest_cost', '*highest_cost', '*qos_threshold', '*qos', '*load_distribution'],
  typeOfRecord:    ['*voice', '*data', '*sms'],

  boolean:     ['true', 'false']});
