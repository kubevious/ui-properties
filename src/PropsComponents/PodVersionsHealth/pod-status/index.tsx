import React, { FC } from 'react';
import _ from 'the-lodash';

import { app } from '@kubevious/ui-framework';

import styles from './styles.module.css';
import { PodHealthInfo, PodPhase, PodRunStage } from '@kubevious/entity-meta/dist/props-config/pods-versions-health';
import { DnComponent, TooltipContainer } from '@kubevious/ui-components';

export interface PodStatusProps {
    config: PodHealthInfo;
    dn?: string;
}

export const PodStatus: FC<PodStatusProps> = ({ config, dn }) => {

    let color : CircleColor | null = null;

    if (config.phase === PodPhase.Running)
    {
        color = RUNNING_POD_STATUS_COLORS[config.runStage!]!;
    }
    else
    {
        const mainColor = POD_STATUS_COLORS[config.phase]
        if (mainColor) {
            color = {
                bg: mainColor,
                stroke: mainColor,
            }
        }
    }

    if (!color) {
        const mainColor = POD_STATUS_COLORS['Unknown']!;
        color = {
            bg: mainColor,
            stroke: mainColor,
        }
    }

    const returnTooltipContent = () =>
    {
        return (<div>
            <div>
                Phase: {config.phase}
            </div>
            {config.runStage &&
            <div>
                Stage: {config.runStage}
            </div>}
            <div>
                Date: {config.date}
            </div>            
            <div>
                <DnComponent dn={config.dn} options={{ relativeTo: dn}} />
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
                placement="right"
                contents={
                    <div className={styles.podStatus}
                         style={{ background: color.bg, borderColor: color.stroke }}
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

const RUNNING_POD_STATUS_COLORS : Record<string, CircleColor> = {
    [PodRunStage.Scheduling] : { bg: "#B7B7A4", stroke: "#E4E4DD" },
    [PodRunStage.Initializing] : { bg: "#E9C46A", stroke: "#FAF1DC" },
    [PodRunStage.WaitingContainersReady] : { bg: "#F4A261", stroke: "#FCE9D9" },
    [PodRunStage.WaitingConditions] : { bg: "#F4A261", stroke: "#FCE9D9" },
    [PodRunStage.WaitingReady] : { bg: "#E76F51", stroke: "#F8D2C9" },
    [PodRunStage.Ready] : { bg: "#2A9D8F", stroke: "#8DE2D8" },
}

interface CircleColor
{
    bg: string;
    stroke: string;
}