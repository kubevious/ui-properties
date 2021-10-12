import _ from 'the-lodash';
import { Group } from '../types';

import { TeleportationItem, TeleportationDirection } from '../Components/Teleportation/types';

export class PropsEnhancer
{
    enhance(groups: Group[])
    {
        if (!groups) {
            return [];
        }

        const dict = _.makeDict(groups, x => x.id, x => x);

        this._enhanceTeleportation(dict);
        
        return _.values(dict);
    }

    private _enhanceTeleportation(dict: Record<string, Group>)
    {
        const linkProps : { isSource?: boolean, isTarget?: boolean, group: Group }[] = [];

        {
            const group = dict["target-links"];
            if (group) {
                linkProps.push({ isTarget: true, group});
                delete dict["target-links"];
            }
        }
        {
            const group = dict["source-links"];
            if (group) {
                linkProps.push({ isSource: true, group});
                delete dict["source-links"];
            }
        }

        if (linkProps.length == 0) {
            return;
        }

        const teleportationDict : Record<string, { isSource?: boolean, isTarget?: boolean }> = {};
        
        for(const props of linkProps)
        {

            for(const row of props.group.config?.rows)
            {
                if (!teleportationDict[row.dn]) {
                    teleportationDict[row.dn] = { };
                }
                const item = teleportationDict[row.dn];
                if (props.isSource) {
                    item.isSource = true;  
                }
                if (props.isTarget) {
                    item.isTarget = true;  
                }
            }
        }

        // console.error("YYYY", teleportationDict);

        let teleportationItems : TeleportationItem[] = [];
        for(const dn of _.keys(teleportationDict))
        {
            teleportationItems.push({
                dn: dn,
                direction: this._reduceDirection(teleportationDict[dn])
            });
        }
        
        teleportationItems = _.orderBy(teleportationItems, x => x.dn);
        // console.error("XXX", teleportationItems);

        dict["teleportation"] = {
            "id": "teleportation",
            "kind": "teleportation",
            "order": 1,
            "title": "Teleportation",
            "config": teleportationItems
        }
    }

    private _reduceDirection(params: { isSource?: boolean, isTarget?: boolean }) : TeleportationDirection
    {
        if (params.isSource && params.isTarget) {
            return 'bidir';
        }

        if (params.isSource) {
            return 'source';
        }

        if (params.isTarget) {
            return 'target';
        }
        
        throw new Error("Something goes wrong");
    }
}