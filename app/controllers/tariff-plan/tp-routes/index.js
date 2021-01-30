import BaseController from '../../query-controller-base';
import { tracked } from '@glimmer/tracking';

export default class TpRoutesIndexController extends BaseController {
  @tracked
  queryParams = ['customId', 'sortColumn', 'sortOrder', 'page', 'pageSize'];

  @tracked
  customId = null;

  permittedFilters = Object.freeze(['customId']);
}
