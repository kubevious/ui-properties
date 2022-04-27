import React, { FC } from 'react';
import { Config } from './types';
import { DnShortcutComponent } from '@kubevious/ui-components';

import styles from './styles.module.css';

export interface ObjectListProps {
    config: Config[];
}

export const ObjectList: FC<ObjectListProps> = ({ config }) => (
    <div className={styles.container}>
        {config.map((element: Config) => (
            <div key={element.dn}>
                <DnShortcutComponent
                    dn={element.dn}
                    errors={element.alertCount.error}
                    warnings={element.alertCount.warn}
                />
            </div>
        ))}
    </div>
);
