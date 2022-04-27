import _ from 'the-lodash';
import { PropsId, PropsKind } from '@kubevious/entity-meta';
import { SnapshotPropsConfig } from '@kubevious/state-registry';

const APP_HEALTH_TABLE_CONFIG = {
    "pods": {
        "count": 1,
        "perc": 100
    },
    "pending": {
        "count": 0,
        "perc": 0
    },
    "running": {
        "count": 1,
        "perc": 100
    },
    "succeeded": {
        "count": 0,
        "perc": 0
    },
    "failed": {
        "count": 0,
        "perc": 0
    },
    "unknown": {
        "count": 0,
        "perc": 0
    },
    "scheduling": {
        "count": 0,
        "perc": 0
    },
    "initializing": {
        "count": 0,
        "perc": 0
    },
    "waitingContainersReady": {
        "count": 0,
        "perc": 0
    },
    "waitingConditions": {
        "count": 0,
        "perc": 0
    },
    "waitingReady": {
        "count": 0,
        "perc": 0
    },
    "ready": {
        "count": 1,
        "perc": 100
    }
};


export const APP_HEALTH_TABLE_CONFIG_PROPS: SnapshotPropsConfig = {
    "kind": PropsKind.healthTable,
    "id": PropsId.health,
    "config": APP_HEALTH_TABLE_CONFIG
}