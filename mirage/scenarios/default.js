export default function (server) {
export default function(server) {
  server.createList('cdr', 2);
  server.createList('destination', 2);
  server.createList('account', 2);

  server.create('tariff-plan', { alias: 'tp_id' });
  server.createList('raw-supplier-rate', 2);
  server.createList('tp-action-plan', 2, { tpid: 'tp_id' });
  server.createList('tp-supplier', 2);
  server.createList('tp-rate', 2,  { tpid: 'tp_id' });
}
