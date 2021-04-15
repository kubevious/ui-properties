import React, { FC } from 'react';
import { Config } from './types';
import { DnShortcutComponent } from '@kubevious/ui-components';

export interface PropertiesObjectListProps {
    config: Config[];
}

export const PropertiesObjectList: FC<PropertiesObjectListProps> = ({ config }) => (
    <>
        {config.map((element: Config) => (
            <div key={element.dn}>
                <DnShortcutComponent
                    dn={element.dn}
                    errors={element.alertCount.error}
                    warnings={element.alertCount.warn}
                />
            </div>
        ))}
    </>
);
