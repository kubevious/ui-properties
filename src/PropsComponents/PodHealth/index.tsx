import _ from 'the-lodash';
import React, { FC } from 'react';

import styles from './styles.module.css';
import { PodHealthConfig } from '@kubevious/entity-meta/dist/props-config/pod-health';
import { BarDataPoint, HistogramBucketChart } from '../../Components/HistogramBucketChart';
import { BucketKeys } from '@kubevious/entity-meta/dist/props-config/histogram-bucket';

export interface PodHealthProps {
    config: PodHealthConfig;
}

export const PodHealth: FC<PodHealthProps> = ({ config }) => {
    
    const restartedPodsBarData = makeRestartedPodsBarData(config);

    return (
        <div className={styles.container}>

            <div className={styles.restarts}>
                <HistogramBucketChart dataPoints={restartedPodsBarData}
                                    title="Pod restarts during last" />
            </div>

        </div>
    );
};


function makeRestartedPodsBarData(config: PodHealthConfig)
{
    const restarts = config?.restarts;
    if (!restarts) {
        return [];
    }

    const dataPoints: BarDataPoint[] = [
        {
            axisLabel: '15 min',
            value: restarts[BucketKeys.BUCKET_15_MINS],
            backgroundColor: '#9D0208'
            
        },
        {
            axisLabel: '1 hr',
            value: restarts[BucketKeys.BUCKET_1_HR],
            backgroundColor: '#D00000'
        },
        {
            axisLabel: '8 hr',
            value: restarts[BucketKeys.BUCKET_8_HRS],
            backgroundColor: '#DC2F02'
        },
        {
            axisLabel: '1 day',
            value: restarts[BucketKeys.BUCKET_1_DAY],
            backgroundColor: '#E85D04'
        },
        {
            axisLabel: 'total',
            value: restarts[BucketKeys.BUCKET_TOTAL],
            backgroundColor: '#F48C06'
        },
    ];
    return dataPoints;
}