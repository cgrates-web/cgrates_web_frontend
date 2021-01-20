import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
export default class ApplicationController extends Controller {
  @service session;

  @action
  logOut() {
    this.session.invalidate()
    window.location.href = '/login';
  }
};
