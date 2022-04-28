import _ from 'the-lodash';
import { PropsId, PropsKind } from '@kubevious/entity-meta';
import { SnapshotPropsConfig } from '@kubevious/state-registry';
import { PodHealthConfig } from '@kubevious/entity-meta/dist/props-config/pod-health';

const POD_HEALTH_CONFIG : PodHealthConfig = {
    "restarts": {
        "15min": 2,
        "1hr": 4,
        "8hr": 10,
        "1day": 15
    }
};


export const POD_HEALTH_CONFIG_PROPS: SnapshotPropsConfig = {
    "kind": PropsKind.podHealth,
    "id": PropsId.health,
    "config": POD_HEALTH_CONFIG
}