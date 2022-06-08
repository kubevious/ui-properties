import React from 'react';

import { ClassComponent } from '@kubevious/ui-framework';
import { AlertView, MESSAGE_GROUP, MyAlert } from '@kubevious/ui-alerts';
import { AlertListProps } from './types';

export class AlertList extends ClassComponent<AlertListProps> {

    configureAlerts = (): MyAlert[] => {
        const { config } = this.props;
        let alerts: MyAlert[] = [];

        for(const elem of config)
        {
            alerts = [
                ...alerts,
                ...elem.targets.map((dn: string) => ({
                    dn,
                    id: elem.alert.id,
                    msg: elem.alert.msg,
                    severity: elem.alert.severity,
                    source: elem.alert.source
                })),
            ];
        }

        return alerts;
    };

    render() {
        const parsedAlerts = this.configureAlerts();

        return (
            <AlertView alerts={parsedAlerts}
                       groupPreset={MESSAGE_GROUP}
                       hideGroupSelector
                       skipScrollbar />
        );
    }
}
