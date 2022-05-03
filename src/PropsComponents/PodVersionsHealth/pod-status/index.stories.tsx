import { Story } from '@storybook/react';
import { PodStatus } from './';
import {
    makePodTemplate
} from '../../../../test/mock/pod-stages';
import React from 'react';
import { PodPhase, PodRunStage } from '@kubevious/entity-meta/dist/props-config/pods-versions-health';

export default {
    title: 'PodStatus',
    component: PodStatus
};

const POD_STATUSES = makePodTemplate();

export const Default: Story = () => (
    <div style={{ background: '#1e1e1e', padding: '20px', color: 'white'}}>

        <h5>Pod Status Legend</h5>

        {POD_STATUSES.map((x, index) => 
            <div key={index}
                 style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <PodStatus config={x} />
                {getStatusStr(x.phase, x.runStage)}
            </div>
        )}
    </div>
);

function getStatusStr(phase: PodPhase, runStage?: PodRunStage)
{
    if (phase === PodPhase.Running) {
        return `${phase} - ${runStage}`;
    }

    return `${phase}`;
}
