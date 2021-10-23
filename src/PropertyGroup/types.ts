import { SnapshotPropsConfig } from '@kubevious/state-registry';

export type PropertyGroupProps = {
    title: string;
    dn: string;
    dnKind: string;
    groupName: string;
    group: SnapshotPropsConfig;
};
