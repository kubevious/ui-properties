import React from 'react';
import { Group } from '../types';
import { Config } from '../Components/Config';
import { DnList } from '../Components/DnList';
import { KeyValueList } from '../Components/KeyValueList';
import { AlertList } from '../Components/AlertList';
import { Counters } from '../Components/Counters';
import { ObjectList } from '../Components/ObjectList';
import { Table } from '../Components/Table';
import { Teleportation } from '../Components/Teleportation';

export const PropertiesContents = ({ group, dn }: { group: Group; dn?: string }) => {
    switch (group.kind) {
        case 'counters':
            return <Counters config={group.config} />;
        case 'object-list':
            return <ObjectList config={group.config} />;
        case 'alert-target-list':
            return <AlertList config={group.config} />;
        case 'key-value':
            return <KeyValueList config={group.config} />;
        case 'dn-list':
            return <DnList config={group.config} />;
        case 'yaml':
            return <Config config={group.config} language={group.kind} dn={dn || ''} />;
        case 'table':
            return <Table config={group.config} />;
        case 'teleportation':
            return <Teleportation config={group.config} />;
        default:
            return <div>No data presented</div>;
    }
};
