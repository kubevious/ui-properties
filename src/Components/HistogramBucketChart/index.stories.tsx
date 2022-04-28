import { Story } from '@storybook/react';
import { HistogramBucketChart } from './';
import { APP_HEALTH_TABLE_CONFIG } from '../../../test/mock/health';
import React from 'react';

export default {
    title: 'HistogramBucketChart',
    component: HistogramBucketChart
};

export const Default: Story = () => (
    <div style={{ background: '#1e1e1e', padding: '10px', height: "200px" }}>
        <HistogramBucketChart config={APP_HEALTH_TABLE_CONFIG.restartedPods} />
    </div>
);