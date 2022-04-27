import _ from 'the-lodash';
import React, { FC } from 'react';

import styles from './styles.module.css';

import { HealthMetric } from '../types';

export interface RowProps {
    label: string;
    metric: HealthMetric;
}

export const Row: FC<RowProps> = ({ label, metric }) => {


    return (<>

        <div>{label}</div>
        <div>{metric.count}</div>
        <div>{metric.perc}%</div>

    </>);

};

