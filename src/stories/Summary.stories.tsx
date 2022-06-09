import { app } from '@kubevious/ui-framework';
import { Story } from '@storybook/react';
import React from 'react';
import { SUMMARY_DATA } from '../../test/mock/data';
import { Summary } from '../Summary';

export default {
    title: 'Summary',
};

const sharedState = app.sharedState;

sharedState.set('summary', SUMMARY_DATA);

export const Default: Story = () => (
    <div style={{ background: '#1e1e1e', padding: '10px' }}>
        <Summary />
    </div>
);
