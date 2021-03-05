import 'jest';

import React from 'react';
import { render } from '@testing-library/react';

import { Summary } from '../src';

function renderSummary() {
  return render(<Summary />);
}

describe('Summary', () => {
  test('Should check that the component Summary is rendered', async () => {
    const { findByTestId } = renderSummary();

    const summary = await findByTestId('summary');

    expect(summary);
  });
});
