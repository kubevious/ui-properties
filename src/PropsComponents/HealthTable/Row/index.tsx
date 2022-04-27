import _ from 'the-lodash';
import React, { FC } from 'react';

import { HealthMetric } from '../types';

export interface RowProps {
    label: string;
    metric: HealthMetric;
}

export const Row: FC<RowProps> = ({ label, metric }) => {

    const count = metric?.count ?? 0;
    const perc = metric?.perc ?? 0;

    return (<>

        <div>{label}</div>
        <div>{count}</div>
        <div>{perc}%</div>

    </>);

};

