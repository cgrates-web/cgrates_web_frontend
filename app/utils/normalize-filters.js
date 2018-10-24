import { isBlank } from '@ember/utils';
import { get } from '@ember/object';

export default function normalizeFilters(params, permittedFilters) {
  const query = {};
  permittedFilters.forEach(function (key) {
    const value = get(params, key);
    if (!isBlank(value)) {
      return query[key.underscore()] = value;
    }
  });
  return query;
}
