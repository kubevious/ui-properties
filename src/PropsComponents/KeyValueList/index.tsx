import React, { FC } from 'react';

import { PropertiesValue } from '../helpers';
import { Config } from './types';

import styles from './styles.module.css';

export interface KeyValueListProps {
    config: Config;
}

export const KeyValueList: FC<KeyValueListProps> = ({ config }) => (
    <div>
        {Object.entries(config).map((item, index) => {
            const value = item[1];
            return (
                <div data-testid="key-value-property" className={styles.envVariable} key={index}>
                    <div className={styles.name}>{item[0]}:</div>
                    <div className={styles.value}>{PropertiesValue(value)}</div>
                </div>
            );
        })}
    </div>
);
