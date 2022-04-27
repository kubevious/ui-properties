import React, { FC } from 'react';
import { MetricBox } from '../MetricBox'
import styles from './style.module.css';

export interface MetricBlockProps {
    title?: string;
    value?: any;
    unit?: string;
    imageUrl?: string
}

export const MetricBlock: FC<MetricBlockProps> = ({ 
    title,
    value,
    unit,
    imageUrl
}) => {

    return (
        <MetricBox className={styles.itemBlock}>

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
