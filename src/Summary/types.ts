import { SnapshotPropsConfig } from '@kubevious/state-registry';

export type SummaryState = {
    data: {
        [container: string]: SnapshotPropsConfig;
    };
};
