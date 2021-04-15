import React, { FC } from 'react';
import { PropertiesValue } from '../helpers';
import { Config } from './types';

import styles from './style.module.css';

export interface PropertiesCountersProps {
    config: Config;
}

export const PropertiesCounters: FC<PropertiesCountersProps> = ({ config }) => (
    <div className="d-flex flex-wrap text-white">
        {config &&
            config.map((element) => {
                const propertiesValue = {
                    value: typeof element.value === 'object' ? element.value.value : element.value,
                    unit: element.unit || '',
                };

                return (
                    <div className={styles.counterBlock} key={element.title}>
                        <label>{element.title}</label>
                        <div className={styles.counterValue}>{PropertiesValue(propertiesValue)}</div>
                    </div>
                );
            })}
    </div>
);
