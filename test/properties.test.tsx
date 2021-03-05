import 'jest';

import React from 'react';
import { render } from '@testing-library/react';

import { Properties } from '../src';

function renderProperties() {
  return render(<Properties />);
}

describe('Properties', () => {
  test('Should check that the component Properties is rendered', async () => {
    const { findByTestId } = renderProperties();

    const properties = await findByTestId('properties');

    expect(properties);
  });
});
