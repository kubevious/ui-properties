import cx from 'classnames';
import React, { FC, MouseEventHandler, useState } from 'react';
import _ from 'the-lodash';
import { PropertiesContents } from '../PropertiesContents';
import { PropertyGroupProps } from './types';

import { PROPS_TOOLTIPS, PROPS_EXPANDED } from '@kubevious/entity-meta';

import styles from './styles.module.css';
import { PropsComplexTooltipValue } from '@kubevious/entity-meta/dist/props-tooltips';
import { DnComponent } from '@kubevious/ui-components';
import { app } from '@kubevious/ui-framework';

export const PropertyGroup : FC<PropertyGroupProps> = ({ group, title, dn, dnKind }) => {

    const [ isExpanded, setIsExpanded ] = useState<boolean>(PROPS_EXPANDED.get(group.id));

    const propertyExpanderHandleClick = () => {
        setIsExpanded(!isExpanded);
    }

    const determineTooltip = () => {
        const tooltipInfo = PROPS_TOOLTIPS.get(group.id as any);
        if (tooltipInfo) {
            if (_.isString(tooltipInfo)) {
                return tooltipInfo as string;
            } else {
                const tooltipComplexInfo = tooltipInfo as PropsComplexTooltipValue;
                const str = tooltipComplexInfo.owner[dnKind];
                if (str) {
                    return str;
                } else {
                    return tooltipComplexInfo.default;
                }
            }
        }
        return null;
    }

    const openMaximized : MouseEventHandler<HTMLSpanElement> = (e) => {
        app.sharedState.set('popup_window', {
            title: 'Properties: ' + group,
            content:
                group.kind !== 'yaml' ? (
                    <div className={`Property-wrapper p-40 overflow-hide`}>
                        {dn && (
                            <div className={styles.containerHeader}>
                                <DnComponent dn={dn} />
                                <h3>{title}</h3>
                            </div>
                        )}
                        <PropertiesContents group={group} />
                    </div>
                ) : (
                    <PropertiesContents group={group} dn={dn} />
                ),
        });

        e.stopPropagation();
    }

    const tooltip = determineTooltip();

    return (
        <div className={styles.propertyGroup}>
            <button
                id="expander"
                className={cx(styles.expander, { [styles.expanderActive] : isExpanded })}
                onClick={propertyExpanderHandleClick}
            >
                {title}
                <span className={styles.propertyGroupOpenClose} />
                <span className={styles.propertyGroupPopup} onClick={openMaximized} />
                {tooltip && (
                    <>
                        <span
                            className={styles.propertyGroupInfo}
                            data-toggle="property-tooltiptext"
                            data-placement="top"
                        />
                        <span className={styles.propertyTooltiptext}>{tooltip}</span>
                    </>
                )}

            </button>
            <div className={cx(styles.scrollbar, 'dark')}>
                <div className="force-overflow">
                    <div className={cx(styles.expanderContents, { [styles.expanderOpen] : isExpanded } )}>
                        <PropertiesContents group={group} />
                    </div>
                </div>
            </div>
        </div>
    );
}
