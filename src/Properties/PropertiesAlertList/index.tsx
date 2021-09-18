import React from 'react';

import { ClassComponent } from '@kubevious/ui-framework';
import { AlertView } from '@kubevious/ui-alerts';
import { Config, PropertiesAlertListProps } from './types';
import { Alert } from '../../types';

export class PropertiesAlertList extends ClassComponent<PropertiesAlertListProps> {

    openRule = (ruleName: string): void => {
        this.sharedState.set('rule_editor_selected_rule_id', ruleName);
        this.sharedState.set('focus_rule_editor', true);
    };

    configureAlerts = (): Alert[] => {
        const { config } = this.props;
        let alerts: Alert[] = [];

        config.map((elem: Config) => {
            alerts = [
                ...alerts,
                ...elem.targets.map((dn: string) => ({
                    dn,
                    id: elem.alert.source.id || 'Missing',
                    msg: elem.alert.msg,
                    severity: elem.alert.severity,
                    source: elem.alert.source,
                    uiKey: `${dn}-${elem.alert.severity}-${elem.alert.source.id}-${elem.alert.msg}`,
                })),
            ];
        });

        return alerts;
    };

    render() {
        const parsedAlerts = this.configureAlerts();

        return (
            <AlertView alerts={parsedAlerts} openRule={this.openRule} groupPreset="message" />
        );
    }
}
