import React, { FC } from 'react';
import cx from 'classnames';

import styles from './style.module.css';

export interface MetricBoxProps {
    className?: string;
}

export const MetricBox: FC<MetricBoxProps> = ({ 
    className,
    children
}) => {

    return (
        <div className={cx(styles.metricBox, className)}>
            {children}
        </div>
    );
}
