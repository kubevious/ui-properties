import { Story } from '@storybook/react';
import { PropertiesContents } from '../PropertiesContents';
import {
    ALERT_TARGET_LIST_PROPS,
    COUNTERS_PROPS,
    DN_LIST_PROPS,
    KEY_VALUE_PROPS,
    OBJECT_LIST_PROPS, TABLE_PROPS,
    TELEPORTATION_PROPS,
    YAML_PROPS,
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
    <div style={{ background: '#1e1e1e', padding: '10px' }}>
        <PropertiesContents group={DN_LIST_PROPS} />
    </div>
);

export const YamlProperties: Story = () => (
    <div style={{ background: '#1e1e1e', padding: '10px' }}>
        <PropertiesContents group={YAML_PROPS} />
    </div>
);

export const TableProperties: Story = () => (
    <div style={{ background: '#1e1e1e', padding: '10px' }}>
        <PropertiesContents group={TABLE_PROPS} />
    </div>
);


export const TeleportationProperties: Story = () => (
    <div style={{ background: '#1e1e1e', padding: '10px' }}>
        <PropertiesContents group={TELEPORTATION_PROPS} />
    </div>
);
