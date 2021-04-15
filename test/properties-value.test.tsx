import 'jest';

import { render } from '@testing-library/react';

import { PropertiesValue } from '../src/Properties/helpers';

describe('PropertiesValue', () => {

  test('case-01', async () => {
    render(PropertiesValue({ value: 123 }));
  });

  test('case-02', async () => {
    render(PropertiesValue({ value: '?' }));
  });

});
