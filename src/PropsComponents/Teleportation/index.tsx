import _ from 'the-lodash';
import React, { FC } from 'react';
import { DnComponent, DnShortcutComponent, IconBox } from '@kubevious/ui-components';
import { parseDn, makeDn } from '@kubevious/entity-meta';
import { TOP_ROOTS } from '@kubevious/entity-meta';

import styles from './styles.module.css';
import { TeleportationProps, TeleportationItem } from './types';

export const Teleportation: FC<TeleportationProps> = ({ config }) => {

    const groups : Record<string, TeleportationItem[]> = {};

    for(const item of config)
    {
        const rootDn = getRoot(item.dn);
        if (!groups[rootDn]) {
            groups[rootDn] = [];
        }
        groups[rootDn].push(item);
    }

    const rootDns = TOP_ROOTS.map(x => x.dn).filter(x => groups[x]);

    const setupTooltipContents = (item: TeleportationItem) => {
        if (item.direction === 'source') {
            return 'Direction: Source';
        }
        if (item.direction === 'target') {
            return 'Direction: Target';
        }
        if (item.direction === 'bidir') {
            return 'Direction: Bidirectional';
        }
        return "";
    }

    return <>

        {rootDns.map((rootDn) => 
            <div key={rootDn}>
                <DnComponent dn={rootDn} options={{ relativeTo: 'root'}} />
                
                <div className={styles.innerList}>
                    {groups[rootDn].map((item, index) => 
                        <div className={styles.entry} key={index}>
                            <div className={styles.entryDirection}>
                                <IconBox tooltipContentsFetcher={() => setupTooltipContents(item)} >
                                    <img src={`/img/props/teleport/${item.direction}.svg`} 
                                         className={styles.entryDirectionIcon} />
                                </IconBox>
                            </div>

                            <div className={styles.entryDnExtra}>
                                <DnShortcutComponent dn={item.dn} key={index} options={{
                                        relativeTo: rootDn
                                    }}
                                 />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )}

        {/* {!isEmptyArray(config) &&
            config.map((item, index) => <DnShortcutComponent key={index} dn={item.dn}  />)} */}
    </>
}

function getRoot(dn: string)
{   
    const parts = parseDn(dn);
    if (parts.length <= 2) {
        return dn;
    }
    return makeDn(parts[0].rn, parts[1].rn);
}
