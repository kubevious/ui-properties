import React, { FC } from 'react';
import { Config } from '../Components/Config';
import { DnList } from '../Components/DnList';
import { KeyValueList } from '../Components/KeyValueList';
import { AlertList } from '../Components/AlertList';
import { Counters } from '../Components/Counters';
import { ObjectList } from '../Components/ObjectList';
import { Table } from '../Components/Table';
import { Teleportation } from '../Components/Teleportation';
import { Links } from '../Components/Links';

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

PROPS_CONTROL_RESOLVER.setup(PropsKind.yaml, (group, dn) => {
    return <Config config={group.config} language={group.kind} dn={dn || ''} />;
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

export interface PropertiesContentsProps {
    group: SnapshotPropsConfig;
    dn?: string 
}

export const PropertiesContents : FC<PropertiesContentsProps> = ({ group, dn }) => {
    return PROPS_CONTROL_RESOLVER.resolve(group, dn);
};
