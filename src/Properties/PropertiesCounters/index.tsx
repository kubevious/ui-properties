import React, { FC } from 'react';
import { camelCase, formatValue, ValueField } from '../helpers';
import { Config } from './types';

import styles from './style.module.css';

export interface PropertiesCountersProps {
    config: Config;
}

export const PropertiesCounters: FC<PropertiesCountersProps> = ({ config }) => (
    <div className="d-flex flex-wrap">
        {config.map((item, index) => {
            const formattedValue = formatValue(item as ValueField);

            return (
                <div className={styles.itemBlock} key={index}>
                    <div className={styles.itemsCount}>
                        {formattedValue.value}
                        {item.unit && <span className={styles.unit}>{formattedValue.unit}</span>}
                    </div>

                    <div className={styles.itemName}>{item.title}</div>

                    <img
                        src={`/img/summary/${camelCase(item.title!)}.svg`}
                        className={styles.itemIcon}
                        alt={item.title}
                    />
                </div>
            );
        })}
    </div>
);
