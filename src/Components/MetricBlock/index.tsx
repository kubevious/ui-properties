import React, { FC } from 'react';
import { MetricBox } from '../MetricBox'
import styles from './style.module.css';

import cx from 'classnames';

export interface MetricBlockProps {
    title?: string;
    value?: any;
    unit?: string;
    imageUrl?: string;
    classNames?: string;

}

export const MetricBlock: FC<MetricBlockProps> = ({ 
    title,
    value,
    unit,
    imageUrl,
    classNames
}) => {

    return (
        <MetricBox className={cx(styles.itemBlock, classNames)}>

            <div className={styles.counter}>
                <div className={styles.numeric}>
                    {value}
                    {unit && <span className={styles.unit}>{unit}</span>}
                </div>

                <div className={styles.title}>{title}</div>
            </div>

            {imageUrl &&
                <img
                    src={imageUrl}
                    className={styles.itemIcon}
                    alt={title}
                />
            }
        </MetricBox>
    );
}
