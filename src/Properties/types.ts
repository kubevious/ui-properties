import { Dn, NodeKind } from '@kubevious/entity-meta';
import { Group } from '../types';

export type PropertiesState = {
    isDnSelected: boolean;
    selectedDn: string;
    dnParts: Dn;
    dnKind: NodeKind;
    selectedObjectProps: Group[];
};
