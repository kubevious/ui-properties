import { Story } from '@storybook/react';
import { HistogramBucketChart, BarDataPoint } from './';
import React from 'react';

export default {
    title: 'HistogramBucketChart',
    component: HistogramBucketChart
};

export const Default: Story = () => {

    const dataPoints: BarDataPoint[] = [
        {
            axisLabel: '15 min',
            value: 0,
            dataLabel: '0 (0%)',
            backgroundColor: 'red',
        },
        {
            axisLabel: '1 hr',
            value: 3,
            backgroundColor: 'green',
        },
        {
            axisLabel: '8 hr',
            value: 3,
            dataLabel: '3 (15%)',
            backgroundColor: 'blue',
        },
        {
            axisLabel: '1 day',
            value: 15,
            dataLabel: '15 (100%)',
            backgroundColor: 'cornsilk',
        },
    ]

    return (
        <div style={{ background: '#1e1e1e', padding: '10px', height: "200px" }}>
            <HistogramBucketChart title="Hello World"
                                  dataPoints={dataPoints}   />
        </div>
    );

}