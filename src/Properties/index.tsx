import _ from 'the-lodash';
import React, { ReactNode } from 'react';
import { ClassComponent } from '@kubevious/ui-framework';
import { PropertyGroup } from '../PropertyGroup';
import { DnPath } from '@kubevious/ui-components';
import { Dn, parseDn, NodeKind } from '@kubevious/entity-meta';
import { SnapshotPropsConfig } from '@kubevious/state-registry';

import { PropertiesState } from './types';

import { PropsEnhancer } from '../logic/props-exhancer';
import { PROPS_TITLES } from '@kubevious/entity-meta';

import './styles.scss';

export class Properties extends ClassComponent<{}, PropertiesState> {
    constructor(props: {} | Readonly<{}>)
    {
        super(props);

        this.state = {
            isDnSelected: false,
            selectedDn: '',
            dnParts: [],
            dnKind: NodeKind.root,
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

    private _renderPropertiesNodeDn(): ReactNode {
        const { dnParts } = this.state;

        return (
            <div className="properties-owner">
                <DnPath dn={dnParts} includeLogo iconSize="xs" />
            </div>
        );
    }

    private _getPropertyGroups() : SnapshotPropsConfig[]
    {
        const { selectedObjectProps } = this.state;
        return selectedObjectProps;
    }

    private _renderContent(): ReactNode {
        const { selectedDn, dnKind } = this.state;

        const propertyGroups = this._getPropertyGroups();

        return propertyGroups.map((item: SnapshotPropsConfig, index: number) => {
            const isExpanded = index === 0;

            return (
                <PropertyGroup
                    key={index}
                    title={PROPS_TITLES.get(item.id)}
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
                let dnParts: Dn = [];
                if (selected_dn) {
                    dnParts = parseDn(selected_dn);
                }

                let dnKind = NodeKind.root;
                if (dnParts.length > 0) {
                    dnKind = _.last(dnParts)!.kind;
                }

                const enhancer = new PropsEnhancer();

                this.setState({
                    isDnSelected: _.isNotNullOrUndefined(selected_dn),
                    selectedDn: selected_dn,
                    dnParts: dnParts,
                    dnKind: dnKind,
                    selectedObjectProps: enhancer.enhance(selected_object_props),
                });
            },
        );
    }

    private _renderProps(): JSX.Element {
        const { selectedObjectProps } = this.state;

        return (
            <>
                { this._renderPropertiesNodeDn()}
                {selectedObjectProps && this._renderContent()}
            </>
        );
    }

    render() {
        const { isDnSelected } = this.state;

        return (
            <div
                data-testid="properties"
                id="propertiesComponent"
                className={'properties'}
            >

                { isDnSelected && this._renderProps() }

                { !isDnSelected && <>
                    <div className="empty">No object selected.</div>
                </> }

            </div>
        );
    }
}
