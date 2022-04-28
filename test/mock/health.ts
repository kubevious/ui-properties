import _ from 'the-lodash';
import { PropsId, PropsKind } from '@kubevious/entity-meta';
import { SnapshotPropsConfig } from '@kubevious/state-registry';
import { WorkloadHealthConfig } from '@kubevious/entity-meta/dist/props-config/app-health';

export const APP_HEALTH_TABLE_CONFIG : WorkloadHealthConfig = {
    "pods": {
        "count": 1,
        "perc": 100
    },
    "pending": {
        "count": 12,
        "perc": 50
    },
    "running": {
        "count": 1,
        "perc": 100
    },
    "succeeded": {
        "count": 5,
        "perc": 33
    },
    "failed": {
        "count": 3,
        "perc": 75
    },
    "unknown": {
        "count": 0,
        "perc": 0
    },
    "scheduling": {
        "count": 10,
        "perc": 10,
    },
    "initializing": {
        "count": 20,
        "perc": 20
    },
    "waitingContainersReady": {
        "count": 30,
        "perc": 30
    },
    "waitingConditions": {
        "count": 40,
        "perc": 40
    },
    "waitingReady": {
        "count": 50,
        "perc": 50
    },
    "ready": {
        "count": 100,
        "perc": 100
    },
    "restartedPods": {
        "15min": 2,
        "1hr": 4,
        "8hr": 10,
        "1day": 15
    }
};


export const APP_HEALTH_TABLE_CONFIG_PROPS: SnapshotPropsConfig = {
    "kind": PropsKind.workloadsHealth,
    "id": PropsId.health,
    "config": APP_HEALTH_TABLE_CONFIG
}