import { Alert } from '../../types';

export type Config = {
    targets: string[];
    alert: Alert;
};

export type AlertListProps = {
    config: Config[];
};
