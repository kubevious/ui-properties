import 'jest';

import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { PropertiesContents } from '../src';

import { KEY_VALUE_PROPS } from './mock-data';

export const renderComponent = (): RenderResult => render(<PropertiesContents group={KEY_VALUE_PROPS} />);

describe('PropertiesContents', () => {
    test('should render key-value content', async () => {
        const { findAllByTestId } = renderComponent();

        const keyValueProps = await findAllByTestId('key-value-property');

        expect(keyValueProps).toBeTruthy();
    });
});
