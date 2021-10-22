import _ from 'the-lodash';
import React, { ReactElement } from 'react';
import { PropsKind } from '@kubevious/entity-meta';
import { EnumDictionary } from '@kubevious/entity-meta';
import { SnapshotPropsConfig } from '@kubevious/state-registry';

export type PropsControlResolver = (group : SnapshotPropsConfig, dn?: string) => ReactElement;

export class PropsControlRegistry
{
    private _dict : EnumDictionary<PropsKind, PropsControlResolver> = {};

    setup(key: PropsKind, cb: PropsControlResolver)  : void
    {
        this._dict[key] = cb;
    }

    resolve(group : SnapshotPropsConfig, dn?: string) : ReactElement
    {
        const cb = this._dict[group.kind];
        if (cb) {
            return cb(group, dn);
        }

        return (<div>No data presented</div>);
    }

}

export const PROPS_CONTROL_RESOLVER = new PropsControlRegistry();