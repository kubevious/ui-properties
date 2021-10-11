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
        const linkProps : { direction: TeleportationDirection, group: Group }[] = [];

        {
            const group = dict["target-links"];
            if (group) {
                linkProps.push({ direction: 'target', group});
            }
        }
        {
            const group = dict["source-links"];
            if (group) {
                linkProps.push({ direction: 'source', group});
            }
        }

        if (linkProps.length == 0) {
            return;
        }

        const teleportationItems : TeleportationItem[] = [];
        for(const props of linkProps)
        {
            for(const row of props.group.config?.rows)
            {
                teleportationItems.push({ 
                    direction: props.direction,
                    dn: row.dn 
                });
            }
        }

        dict["teleportation"] = {
            "id": "teleportation",
            "kind": "teleportation",
            "order": 1,
            "title": "Teleportation",
            "config": teleportationItems
        }
    }
}