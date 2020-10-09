import { expect } from 'chai';
import { describe, it } from 'mocha';
import normalizeFilters from 'cgrates-web-frontend/utils/normalize-filters';

describe('Unit | Utility | #normalizeFilters', function () {
  const params = {
    createdAt: null,
    supplierName: '123',
  };
  const permittedFilters = ['createdAt', 'supplierName'];
  const subject = normalizeFilters(params, permittedFilters);

  it('removes keys with blank value', function () {
    expect(Object.keys(subject).length).to.eq(1);
  });

  it('underscores all keys', function () {
    expect(subject.supplier_name).to.eq('123');
  });
});
