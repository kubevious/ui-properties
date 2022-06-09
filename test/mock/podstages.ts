import _ from 'the-lodash';
import { PropsId, PropsKind } from '@kubevious/entity-meta';
import { SnapshotPropsConfig } from '@kubevious/state-registry';
import { PodHealthInfo, PodPhase, PodRunStage, PodVersionsHealthInfo } from '@kubevious/entity-meta/dist/props-config/pods-versions-health';

function makeConditions()
{
    return [
        {
            "type": "PodScheduled",
            "state": true
        },
        {
            "type": "Initialized",
            "state": true
        },
        {
            "type": "ContainersReady",
            "state": true
        },
        {
            "type": "Ready",
            "state": true
        },
    ];
}

function makePod(phase: PodPhase, runStage?: PodRunStage)
{
    const conditions = (phase === PodPhase.Running) ? makeConditions() : [];

    return {
        "dn": "root/logic/ns-[kubevious]/app-[kubevious-ui]/launcher-[Deployment]/replicaset-[7b479c4cf9]/pod-[fvt4l]",
        "date": new Date().toISOString(),
        "phase": phase,
        "runStage": runStage,
        "conditions": conditions
    };
}

export function makePodTemplate()
{
    return [
        makePod(PodPhase.Pending),
        makePod(PodPhase.Running, PodRunStage.Scheduling),
        makePod(PodPhase.Running, PodRunStage.Initializing),
        makePod(PodPhase.Running, PodRunStage.WaitingContainersReady),
        makePod(PodPhase.Running, PodRunStage.WaitingConditions),
        makePod(PodPhase.Running, PodRunStage.WaitingReady),
        makePod(PodPhase.Running, PodRunStage.Ready),
        makePod(PodPhase.Succeeded),
        makePod(PodPhase.Failed),
        makePod(PodPhase.Unknown),
    ];
}

function makePods(count: number)
{
    let list : PodHealthInfo[] = [];
    while(list.length < count) {
        list = _.concat(list, makePodTemplate());
    }
    list = _.take(list, count);
    return list;
}

const POD_VERSIONS_HEALTH_CONFIG: PodVersionsHealthInfo = {
    "versions": [
        {
            "launcher": {
                "dn": "root/logic/ns-[kubevious]/app-[kubevious-ui]/launcher-[Deployment]/replicaset-[7b479c4cf9]",
                "date": "2021-03-30T19:21:55Z"
            },
            "pods": makePods(30)
        },
        {
            "launcher": {
                "dn": "root/logic/ns-[kubevious]/app-[kubevious-ui]/launcher-[Deployment]/replicaset-[7b479c4cf9]",
                "date": "2021-03-30T19:21:55Z"
            },
            "pods": makePods(5)
        },
        {
            "launcher": {
                "dn": "root/logic/ns-[kubevious]/app-[kubevious-ui]/launcher-[Deployment]/replicaset-[7b479c4cf9]",
                "date": "2021-03-30T19:21:55Z"
            },
            "pods": makePods(1)
        },
        {
            "launcher": {
                "dn": "root/logic/ns-[kubevious]/app-[kubevious-ui]/launcher-[Deployment]/replicaset-[7b479c4cf9]",
                "date": "2021-03-30T19:21:55Z"
            },
            "pods": makePods(10)
        }
    ]
};

export const POD_VERSIONS_HEALTH_PROPS: SnapshotPropsConfig = {
    "kind": PropsKind.podsVersionsHealth,
    "id": PropsId.podStages,
    "config": POD_VERSIONS_HEALTH_CONFIG
}