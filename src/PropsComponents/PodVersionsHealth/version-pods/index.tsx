import React, { FC } from 'react';
import _ from 'the-lodash';

import styles from './styles.module.css';
import { PodVersionHealthInfo } from '@kubevious/entity-meta/dist/props-config/pods-versions-health';
import { PodStatus } from '../pod-status';
import { DnShortcutComponent } from '@kubevious/ui-components';

export interface VersionPodsProps {
    config: PodVersionHealthInfo;
    dn?: string;
}

export const VersionPods: FC<VersionPodsProps> = ({ config, dn }) => {

    const pods = config.pods ?? [];

    return (
        <div className={styles.versionPods}>

            <DnShortcutComponent dn={config.launcher.dn}
                                 options={{ onlyRn: true, onlyRnOverrideName: '' }} />

            {pods.map((x, index) => 
                <PodStatus key={index} config={x} dn={dn} />
            )}

        </div>
    );
};


