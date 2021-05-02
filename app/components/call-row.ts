import Component from '@glimmer/component';
import Call from 'cgrates-web-frontend/models/call';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

interface CallRowArgs {
  call: Call
}

export default class CallRow extends Component<CallRowArgs> {
  @tracked
  expanded = false;

  @service()
  currentUser: any; // TODO typing for the service;

  get customerChargersRunId(): string {
    return this.currentUser?.user?.tenant?.customerChargersRunId;
  }

  get customerCdr() {
    return this.args.call.cdrs.find(cdr => cdr.runId === this.customerChargersRunId);
  }

  @action
  toggleExpanded() {
    this.expanded = !this.expanded;
  }
}
