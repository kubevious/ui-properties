import 'jest';

import React from 'react';
import { render } from '@testing-library/react';

import { Properties } from '../src';


describe('Properties', () => {
  
  test('constructor', async () => {
    const { findByTestId } = render(<Properties />);

    const properties = await findByTestId('properties');

    expect(properties);
  });

});
