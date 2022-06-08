import { MyAlert } from '@kubevious/ui-alerts';

export type Config = {
    targets: string[];
    alert: MyAlert;
};

export type AlertListProps = {
    config: Config[];
};
