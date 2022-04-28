import React, { FC } from 'react';
import { Config } from '../PropsComponents/Config';
import { DnList } from '../PropsComponents/DnList';
import { KeyValueList } from '../PropsComponents/KeyValueList';
import { AlertList } from '../PropsComponents/AlertList';
import { Counters } from '../PropsComponents/Counters';
import { ObjectList } from '../PropsComponents/ObjectList';
import { Table } from '../PropsComponents/Table';
import { Teleportation } from '../PropsComponents/Teleportation';
import { Links } from '../PropsComponents/Links';
import { WorkloadsHealth } from '../PropsComponents/WorkloadsHealth';
import { PodVersionsHealth } from '../PropsComponents/PodVersionsHealth';

import { PropsKind } from '@kubevious/entity-meta';
import { SnapshotPropsConfig } from '@kubevious/state-registry';

import { PROPS_CONTROL_RESOLVER } from '../control-registry';


PROPS_CONTROL_RESOLVER.setup(PropsKind.keyValue, (group) => {
    return <KeyValueList config={group.config} />;
})

PROPS_CONTROL_RESOLVER.setup(PropsKind.dnList, (group, dn) => {
    return <DnList config={group.config} options={{ relativeTo: dn }} />;
})

PROPS_CONTROL_RESOLVER.setup(PropsKind.table, (group) => {
    return <Table config={group.config} />;
})

PROPS_CONTROL_RESOLVER.setup(PropsKind.yaml, (group, dn, isMaximized) => {
    return <Config config={group.config} language={group.kind} dn={dn || ''} isMaximized={isMaximized} />;
})

PROPS_CONTROL_RESOLVER.setup(PropsKind.teleportation, (group) => {
    return <Teleportation config={group.config} />;
})

PROPS_CONTROL_RESOLVER.setup(PropsKind.counters, (group) => {
    return <Counters config={group.config} />;
})

PROPS_CONTROL_RESOLVER.setup(PropsKind.objectList, (group) => {
    return <ObjectList config={group.config} />;
})

PROPS_CONTROL_RESOLVER.setup(PropsKind.alertTargetList, (group) => {
    return <AlertList config={group.config} />;
})

PROPS_CONTROL_RESOLVER.setup(PropsKind.links, (group, dn) => {
    return <Links config={group.config} options={{ relativeTo: dn }} />;
})

PROPS_CONTROL_RESOLVER.setup(PropsKind.workloadsHealth, (group) => {
    return <WorkloadsHealth config={group.config} />;
})

// TODO: TO DELETE SOME TIME LATER:
PROPS_CONTROL_RESOLVER.setup(PropsKind.healthTable, (group) => {
    return <WorkloadsHealth config={group.config} />;
})

PROPS_CONTROL_RESOLVER.setup(PropsKind.podsVersionsHealth, (group, dn) => {
    return <PodVersionsHealth config={group.config} dn={dn} />;
})

export interface PropertiesContentsProps {
    group: SnapshotPropsConfig;
    dn?: string;
    isMaximized?: boolean;
}

export const PropertiesContents : FC<PropertiesContentsProps> = ({ group, dn, isMaximized }) => {
    return PROPS_CONTROL_RESOLVER.resolve(group, dn, isMaximized);
};
