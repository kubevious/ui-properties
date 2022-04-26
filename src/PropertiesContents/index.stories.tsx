import { Story } from '@storybook/react';
import { PropertiesContents } from './';
import {
    ALERT_TARGET_LIST_PROPS,
    COUNTERS_PROPS,
    DN_LIST_PROPS,
    KEY_VALUE_PROPS,
    OBJECT_LIST_PROPS, TABLE_PROPS,
    TELEPORTATION_PROPS,
    YAML_PROPS,
    TARGET_LINKS_PROPS,
    POD_VERSIONS_HEALTH_PROPS
} from '../../test/mock-data';
import React from 'react';

export default {
    title: 'PropertiesContents',
};

export const CountersProperties: Story = () => (
    <div style={{ background: '#1e1e1e', padding: '10px' }}>
        <PropertiesContents group={COUNTERS_PROPS} />
    </div>
);

export const ObjectListProperties: Story = () => (
    <div style={{ background: '#1e1e1e', padding: '10px' }}>
        <PropertiesContents group={OBJECT_LIST_PROPS} />
    </div>
);

export const AlertTargetListProperties: Story = () => (
    <div style={{ background: '#1e1e1e', padding: '10px' }}>
        <PropertiesContents group={ALERT_TARGET_LIST_PROPS} />
    </div>
);

export const KeyValueProperties: Story = () => (
    <div style={{ background: '#1e1e1e', padding: '10px' }}>
        <PropertiesContents group={KEY_VALUE_PROPS} />
    </div>
);

export const DnListProperties: Story = () => (
    <div style={{ background: '#AAAAAA', padding: '10px', margin: '10px' }}>

        <div style={{ background: '#1e1e1e', padding: '10px', margin: '10px' }}>
            <PropertiesContents group={DN_LIST_PROPS} dn='root/logic/ns-[addr]' />
        </div>

        <div style={{ background: '#1e1e1e', padding: '10px', margin: '10px' }}>
            <PropertiesContents group={DN_LIST_PROPS} />
        </div>

    </div>
);

export const YamlProperties: Story = () => (
    <div style={{ background: '#1e1e1e', padding: '10px' }}>
        <PropertiesContents group={YAML_PROPS} dn='root/logic/ns-[addr]' />
    </div>
);

export const YamlPropertiesMaximized: Story = () => (
    <div style={{ background: '#1e1e1e', padding: '10px' }}>
        <PropertiesContents group={YAML_PROPS} dn='root/logic/ns-[addr]' isMaximized />
    </div>
);

export const TableProperties: Story = () => (
    <div style={{ background: '#1e1e1e', padding: '10px' }}>
        <PropertiesContents group={TABLE_PROPS} />
    </div>
);

export const TargetLinksProperties: Story = () => (

    <div style={{ background: '#AAAAAA', padding: '10px', margin: '10px' }}>

        <div style={{ background: '#1e1e1e', padding: '10px', margin: '10px' }}>
            <PropertiesContents group={TARGET_LINKS_PROPS} dn='root/logic/ns-[book]' />
        </div>

        <div style={{ background: '#1e1e1e', padding: '10px', margin: '10px' }}>
            <PropertiesContents group={TARGET_LINKS_PROPS} />
        </div>

    </div>
);

export const TeleportationProperties: Story = () => (
    <div style={{ background: '#1e1e1e', padding: '10px' }}>
        <PropertiesContents group={TELEPORTATION_PROPS} />
    </div>
);

export const PodVersionsProperties: Story = () => (
    <div style={{ background: '#1e1e1e', padding: '10px' }}>
        <PropertiesContents group={POD_VERSIONS_HEALTH_PROPS} />
    </div>
);

