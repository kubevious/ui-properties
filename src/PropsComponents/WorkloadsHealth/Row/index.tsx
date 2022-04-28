import _ from 'the-lodash';
import React, { FC } from 'react';

import { WorkloadHealthMetric } from '@kubevious/entity-meta/dist/props-config/app-health';

export interface RowProps {
    label: string;
    metric: WorkloadHealthMetric;
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

