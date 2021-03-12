import 'jest';

import React from 'react';
import { render } from '@testing-library/react';

import { PropertiesContents } from '../src';

import { KEY_VALUE_PROPS } from './mock-data'


describe('PropertiesContents', () => {
  
  test('key-value', async () => {
    const { findAllByTestId } = render(<PropertiesContents group={KEY_VALUE_PROPS}  />);

    // expect(component);
    // console.log(component);
    const keyValueProps = await findAllByTestId('key-value-property');

    for(let x of keyValueProps)
    {
      console.log(x.innerHTML);
    }
    // const storageClass = _.first(keyValueProps.filter(x => ))

    expect(keyValueProps);
  });


});
