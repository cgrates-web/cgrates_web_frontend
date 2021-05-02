import BaseController from '../query-controller-base';
import { tracked } from '@glimmer/tracking';

export default class TpRoutesIndexController extends BaseController {
  @tracked
  queryParams = ['destination', 'sortColumn', 'sortOrder', 'page', 'pageSize'];

  @tracked
  destination = null;

  permittedFilters = Object.freeze(['destination']);
}
