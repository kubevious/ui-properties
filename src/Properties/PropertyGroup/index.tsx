import cx from 'classnames';
import React from 'react';
import { propertyGroupTooltip } from '@kubevious/helpers/dist/docs';
import _ from 'the-lodash';
import { ClassComponent } from '@kubevious/ui-framework';
import { DnComponent } from '@kubevious/ui-components';
import { PropertiesContents } from '../PropertiesContents';
import { PropertyGroupProps } from './types';

import styles from './styles.module.css';

export class PropertyGroup extends ClassComponent<PropertyGroupProps> {
    tooltip: string;

    constructor(props: PropertyGroupProps | Readonly<PropertyGroupProps>) {
        super(props);

        this.tooltip = '';
        this.renderTooltip();

        this.openMaximized = this.openMaximized.bind(this);
        this.renderTooltip = this.renderTooltip.bind(this);
    }

    renderTooltip(): void {
        const { group, dnKind } = this.props;

        const tooltipInfo = propertyGroupTooltip(group.id);
        if (tooltipInfo && _.isObject(tooltipInfo)) {
            const str: string = _.get(tooltipInfo, 'owner.' + dnKind);
            this.tooltip = str ? str : _.get(tooltipInfo, 'default');
        } else if (tooltipInfo && _.isString(tooltipInfo)) {
            this.tooltip = tooltipInfo;
        }
    }

    openMaximized(): void {
        const { dn, group } = this.props;

        this.sharedState.set('popup_window', {
            title: 'Properties: ' + group,
            content:
                group.kind !== 'yaml' ? (
                    <div className={`Property-wrapper p-40 overflow-hide`}>
                        {dn && (
                            <div className={styles.containerHeader}>
                                <DnComponent dn={dn} />
                                <h3>{group.title}</h3>
                            </div>
                        )}
                        <PropertiesContents group={group} />
                    </div>
                ) : (
                    <PropertiesContents group={group} dn={dn} />
                ),
        });
    }

    render() {
        const { title, extraClassTitle, extraClassContents, group, propertyExpanderHandleClick } = this.props;

        return (
            <div className={styles.propertyGroup}>
                <button
                    id="expander"
                    className={cx(styles.expander, extraClassTitle)}
                    onClick={propertyExpanderHandleClick}
                >
                    {title}
                    <span className={styles.propertyGroupOpenClose} />
                    <span className={styles.propertyGroupPopup} onClick={this.openMaximized} />
                    {this.tooltip && (
                        <>
                            <span
                                className={styles.propertyGroupInfo}
                                data-toggle="property-tooltiptext"
                                data-placement="top"
                            />
                            <span className={styles.propertyTooltiptext}>{this.tooltip}</span>
                        </>
                    )}
                </button>
                <div className={cx(styles.scrollbar, 'dark')}>
                    <div className="force-overflow">
                        <div className={cx(styles.expanderContents, extraClassContents, 'expander-contents')}>
                            <PropertiesContents group={group} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
