import React, { FC } from 'react';
import _ from 'the-lodash';

import styles from './styles.module.css';
import { PodVersionsHealthInfo } from '@kubevious/entity-meta/dist/props-config/pods-versions-health';

import { VersionColumn } from './version-column';

export interface PodVersionsHealthProps {
    config: PodVersionsHealthInfo;
}

export const PodVersionsHealth: FC<PodVersionsHealthProps> = ({ config }) => {

    const versions = config?.versions ?? [];

    return (
        <div className={styles.container}>

            {versions.map((x, index) => 
                <VersionColumn key={index}
                               config={x}
                                />
            )}

        </div>
    );
};

