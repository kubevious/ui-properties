import 'jest';

import React from 'react';
import { render } from '@testing-library/react';

import { Properties } from '../src';

export const renderComponent = () => render(<Properties />)

describe('Properties', () => {
    test('constructor', async () => {
        const { findByTestId } = render(<Properties />);

        const properties = await findByTestId('properties');

        expect(properties);
    });
});
