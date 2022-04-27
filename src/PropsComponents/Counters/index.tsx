import React, { FC } from 'react';
import { camelCase, formatValue, ValueField } from '../helpers';
import { Config } from './types';
import { MetricBlock } from '../../Components/MetricBlock';

import styles from './style.module.css';

export interface CountersProps {
    config: Config;
}

export const Counters: FC<CountersProps> = ({ config }) => (
    <div className={styles.counters}>
        {config.map((item, index) => {
            const formattedValue = formatValue(item as ValueField);

            return <MetricBlock key={index}
                                title={item.title}
                                value={formattedValue.value}
                                unit={formattedValue.unit}
                                imageUrl={`/img/summary/${camelCase(item.title!)}.svg`}
                            />

        })}
    </div>
);
