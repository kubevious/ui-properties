import _ from 'the-lodash';
import React, { FC } from 'react';
import GaugeChart from 'react-gauge-chart'

import styles from './styles.module.css';
import { HealthMetric } from '../types';
import { Label } from '@kubevious/ui-components';
import { MetricBox } from '../../../Components/MetricBox';


export interface GaugeBlockProps {
    label: string;
    metric: HealthMetric;

    arcsLength?: number[] | undefined;
    colors?: string[] | undefined;
}

export const GaugeBlock: FC<GaugeBlockProps> = ({ 
    label, metric,
    arcsLength, colors,
}) => {

    const chartStyle = {
        height: 81,
        width: 150,
    }

    const labelText = `${label} (${metric.count})`;

    return (<MetricBox className={styles.gaugeBlock} >

        <GaugeChart
                    arcsLength={arcsLength}
                    colors={colors}
                    percent={metric.perc / 100} 
                    style={chartStyle}
                    />

        <Label className={styles.label}
               text={labelText} />

    </MetricBox>);

};

