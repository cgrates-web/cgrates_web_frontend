import Service from '@ember/service';

export default Service.extend({
  action: Object.freeze([
    '*allow_negative',
    '*call_url',
    '*call_url_async',
    '*cdrlog',
    '*debit',
    '*deny_negative',
    '*disable_account',
    '*enable_account',
    '*log',
    '*mail_async',
    '*reset_account',
    '*reset_counter',
    '*reset_counters',
    '*reset_triggers',
    '*set_recurrent',
    '*topup',
    '*topup_reset',
    '*unset_recurrent',
    '*unlimited',
  ]),

  balanceType: Object.freeze(['*monetary', '*data', '*sms', '*voice']),
  direction: Object.freeze(['*in', '*out']),

  maxCostStrategy: Object.freeze(['*free', '*disconnect']),
  roundingMethod: Object.freeze(['*up', '*down', '*middle']),
  strategy: Object.freeze([
    '*static',
    '*lowest_cost',
    '*highest_cost',
    '*qos_threshold',
    '*qos',
    '*load_distribution',
  ]),
  typeOfRecord: Object.freeze(['*voice', '*data', '*sms']),

  boolean: Object.freeze(['true', 'false']),

  thresholdType: Object.freeze([
    '*min_counter',
    '*max_counter',
    '*min_balance',
    '*max_balance',
    '*min_asr',
    '*max_asr',
    '*min_acd',
    '*max_acd',
    '*min_acc',
    '*max_acc',
    '*min_tcc',
    '*max_tcc',
    '*min_tcd',
    '*max_tcd',
    '*min_pdd',
    '*max_pdd',
  ]),

  balanceTag: Object.freeze([
    'MONETARY',
    'SMS',
    'INTERNET',
    'INTERNET_TIME',
    'MINUTES',
  ]),

  metrics: Object.freeze(['ACC', 'ACD', 'ASR', 'PDD', 'TCC', 'TCD']),
});
