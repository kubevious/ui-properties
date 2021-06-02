import _ from 'the-lodash';
import React, { ReactNode } from 'react';
import { ClassComponent } from '@kubevious/ui-framework';
import { PropertyGroup } from './PropertyGroup';
import { DnPath } from '@kubevious/ui-components';
import cx from 'classnames';
import * as DnUtils from '@kubevious/helpers/dist/dn-utils';

import { Group } from '../types';
import { PropertiesState } from './types';

import './styles.scss';

export class Properties extends ClassComponent<{}, PropertiesState> {
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {
            isDnSelected: false,
            selectedDn: '',
            dnParts: [],
            dnKind: '',
            selectedObjectProps: [],
        };

        this._renderContent = this._renderContent.bind(this);
    }

    propertyExpanderHandleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        const target = event.currentTarget;
        target.classList.toggle('active');
        const contentsElem =
            target.parentElement && target.parentElement.getElementsByClassName('expander-contents')[0];
        contentsElem && contentsElem.classList.toggle('expander-open');
    }

    _renderPropertiesNodeDn(): ReactNode {
        const { dnParts } = this.state;

        return (
            <div className="properties-owner">
                <DnPath dnParts={dnParts} includeLogo iconSize="md" />
            </div>
        );
    }

    _renderContent(): ReactNode {
        const { selectedDn, selectedObjectProps, dnKind } = this.state;
        const propertyGroups = _.orderBy(selectedObjectProps, (x: { order: number }) => {
            if (x.order) {
                return x.order;
            }
            return 100;
        });

        return propertyGroups.map((item: Group, index: number) => {
            const isExpanded = index === 0;

            return (
                <PropertyGroup
                    key={index}
                    title={item.title || ''}
                    extraClassTitle={isExpanded ? 'active' : ''}
                    extraClassContents={isExpanded ? 'expander-open' : ''}
                    dn={selectedDn}
                    dnKind={dnKind}
                    groupName={item.id}
                    group={item}
                    propertyExpanderHandleClick={this.propertyExpanderHandleClick}
                />
            );
        });
    }


    componentDidMount() {
        this.subscribeToSharedState(
            ['selected_dn', 'selected_object_props'],
            ({ selected_dn, selected_object_props }) => {
                let dnParts: DnUtils.RnInfo[] = [];
                if (selected_dn) {
                    dnParts = DnUtils.parseDn(selected_dn);
                }

                let dnKind = '';
                if (dnParts.length > 0) {
                    const lastDn = _.last(dnParts);
                    dnKind = lastDn ? lastDn.kind : '';
                }

                this.setState({
                    isDnSelected: _.isNotNullOrUndefined(selected_dn),
                    selectedDn: selected_dn,
                    dnParts: dnParts,
                    dnKind: dnKind,
                    selectedObjectProps: selected_object_props,
                });
            },
        );
    }

    renderProps(props: Group[]): JSX.Element {
        return (
            <>
                { this._renderPropertiesNodeDn()}
                {props && this._renderContent()}
            </>
        );
    }

    render() {
        const { isDnSelected, selectedDn, selectedObjectProps } = this.state;

        return (
            <div
                data-testid="properties"
                id="propertiesComponent"
                className={cx('properties', {
                    empty: !selectedDn && !selectedObjectProps,
                })}
            >

                { isDnSelected && this.renderProps(selectedObjectProps) }

                { !isDnSelected && <>
                    <div className="empty">No object selected.</div>
                </> }

            </div>
        );
    }
}
