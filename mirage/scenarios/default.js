export default function (server) {
  server.createList('cdr', 2);
  server.createList('destination', 2);
  server.createList('account', 2);

  server.create('tariff-plan', { alias: 'tp_id' });
  server.createList('raw-supplier-rate', 2);
  server.createList('tp-action-plan', 2, { tpid: 'tp_id' });
  server.createList('tp-action', 2, { tpid: 'tp_id' });
  server.createList('tp-supplier', 2);
  server.createList('tp-rate', 2, { tpid: 'tp_id' });
  server.createList('tp-threshold', 2, { tpid: 'tp_id' });
  server.createList('tp-alias', 2, { tpid: 'tp_id' });
  server.createList('tp-filter', 2, { tpid: 'tp_id' });
  server.createList('tp-resource', 2, { tpid: 'tp_id' });
  server.createList('tp-rate', 2,  { tpid: 'tp_id' });
  server.createList('tp-attribute', 2,  { tpid: 'tp_id' });
}
