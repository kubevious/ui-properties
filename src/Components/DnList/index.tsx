import React, { FC } from 'react';
import { DnShortcutComponent } from '@kubevious/ui-components';
import { isEmptyArray } from '../../util';

import { DnOptions } from '../../types';

import styles from './styles.module.css';

export interface DnListProps {
    config: string[];
    options?: DnOptions;
}

export const DnList: FC<DnListProps> = ({ config, options }) => (
    <div className={styles.container}>
        {!isEmptyArray(config) &&
            config.map((item, index) => <DnShortcutComponent key={index} dn={item} options={options} />)}
    </div>
);
