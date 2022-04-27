import React, { FC } from 'react';
import _ from 'the-lodash';

import styles from './styles.module.css';
import { PodVersionsHealthInfo } from '@kubevious/entity-meta/dist/props-config/pods-versions-health';

import { VersionPods } from './version-pods';
import { Label } from '@kubevious/ui-components';

export interface PodVersionsHealthProps {
    config: PodVersionsHealthInfo;
    dn?: string;
}

export const PodVersionsHealth: FC<PodVersionsHealthProps> = ({ config, dn }) => {

    const versions = config?.versions ?? [];

    if (versions.length === 0) {
        return <div>
            <Label text="No pods found" />
        </div>
    }

    return (
        <div className={styles.container}>

            {versions.map((x, index) => 
                <VersionPods key={index}
                             config={x}
                             dn={dn}
                             />
            )}

        </div>
    );
};

