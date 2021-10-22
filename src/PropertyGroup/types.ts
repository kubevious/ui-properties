import { SnapshotPropsConfig } from '@kubevious/state-registry';

export type PropertyGroupProps = {
    title: string;
    extraClassTitle: string;
    extraClassContents: string;
    dn: string;
    dnKind: string;
    groupName: string;
    group: SnapshotPropsConfig;
    propertyExpanderHandleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
