import 'jest';

import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { Summary } from '../src';

const renderComponent = (): RenderResult => render(<Summary />);

describe('Summary', () => {
    test('should check that the component Summary is rendered', async () => {
        const { findByTestId } = renderComponent();

        const summary = await findByTestId('summary');

        expect(summary).toBeTruthy();
    });
});
