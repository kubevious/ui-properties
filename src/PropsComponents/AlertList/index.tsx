import React from 'react';

import { ClassComponent } from '@kubevious/ui-framework';
import { AlertView, MESSAGE_GROUP } from '@kubevious/ui-alerts';
import { AlertListProps } from './types';
import { Alert } from '../../types';

export class AlertList extends ClassComponent<AlertListProps> {

    openRule = (ruleName: string): void => {
        this.sharedState.set('rule_editor_selected_rule_id', ruleName);
        this.sharedState.set('focus_rule_editor', true);
    };

    configureAlerts = (): Alert[] => {
        const { config } = this.props;
        let alerts: Alert[] = [];

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
                       openRule={this.openRule}
                       groupPreset={MESSAGE_GROUP}
                       hideGroupSelector
                       skipScrollbar />
        );
    }
}
