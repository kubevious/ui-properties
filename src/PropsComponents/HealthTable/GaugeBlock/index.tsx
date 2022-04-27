import _ from 'the-lodash';
import React, { FC } from 'react';
import GaugeChart from 'react-gauge-chart'

import styles from './styles.module.css';
import { HealthMetric } from '../types';
import { Label } from '@kubevious/ui-components';
import { MetricBox } from '../../../Components/MetricBox';

import cx from 'classnames';

export interface GaugeBlockProps {
    label: string;
    metric: HealthMetric;

    arcsLength?: number[] | undefined;
    colors?: string[] | undefined;

    classNames?: string;
}

export const GaugeBlock: FC<GaugeBlockProps> = ({ 
    label, metric,
    arcsLength, colors,
    classNames
}) => {

    const chartStyle = {
        height: 68,
        width: 150,
    }

    const count = metric?.count ?? 0;
    const perc = metric?.perc ?? 0;

    const labelText = `${label} (${count})`;

    return (<MetricBox className={cx(styles.gaugeBlock, classNames)} >

        <GaugeChart
                    arcsLength={arcsLength}
                    colors={colors}
                    percent={perc / 100} 
                    style={chartStyle}
                    needleColor='#999999'
                    needleBaseColor='#999999'
                    animDelay={100}
                    animateDuration={1000}
                    />

        <Label className={styles.label}
               text={labelText} />

    </MetricBox>);

};

