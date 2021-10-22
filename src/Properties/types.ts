import { Dn, NodeKind } from '@kubevious/entity-meta';
import { SnapshotPropsConfig } from '@kubevious/state-registry';

export type PropertiesState = {
    isDnSelected: boolean;
    selectedDn: string;
    dnParts: Dn;
    dnKind: NodeKind;
    selectedObjectProps: SnapshotPropsConfig[];
};
