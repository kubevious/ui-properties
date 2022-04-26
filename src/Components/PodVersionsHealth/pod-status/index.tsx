import React, { FC } from 'react';
import _ from 'the-lodash';

import { app } from '@kubevious/ui-framework';

import styles from './styles.module.css';
import { PodHealthInfo } from '@kubevious/entity-meta/dist/props-config/pods-versions-health';
import { DnComponent, TooltipContainer } from '@kubevious/ui-components/dist';

export interface PodStatusProps {
    config: PodHealthInfo;
}

export const PodStatus: FC<PodStatusProps> = ({ config }) => {

    const color = POD_STATUS_COLORS[config.phase] ?? POD_STATUS_COLORS['Unknown'];

    const returnTooltipContent = () =>
    {
        return (<div>
            <div>
                Phase: {config.phase}
            </div>
            <div>
                Date: {config.date}
            </div>            
            <div>
                <DnComponent dn={config.dn} />
            </div>
        </div>);
    }

    const clickDn = (): void => {
        app.sharedState.set('selected_dn', config.dn);
        app.sharedState.set('auto_pan_to_selected_dn', true);
    };

    return (
        <div className={styles.podStatusContainer}>

            <TooltipContainer
                tooltipContentsFetcher={returnTooltipContent}
                contents={
                    <div className={styles.podStatus}
                         style={{ background: color }}
                         onClick={clickDn}
                         >
                    </div>
                }
            >
            </TooltipContainer>

        </div>
    );
};


const POD_STATUS_COLORS : Record<string, string> = {
    "Pending": "#FAC710",
    "Running": "#0CA789",
    "Succeeded": "#808080",
    "Failed": "#DA0063",
    "Unknown": "#F24726",
}