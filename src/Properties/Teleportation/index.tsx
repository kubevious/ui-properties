import _ from 'the-lodash';
import React, { FC } from 'react';
import { DnLink, DnShortcutComponent } from '@kubevious/ui-components';
import { parseDn, makeDn } from '@kubevious/entity-meta';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
 
import styles from './styles.module.css';

export type Direction = 'source' | 'target';

export interface Item {
    direction: Direction;
    dn: string;
}

export interface TeleportationProps {
    config: Item[];
}

export const Teleportation: FC<TeleportationProps> = ({ config }) => {

    const groups : Record<string, Item[]> = {};

    for(const item of config)
    {
        const rootDn = getRoot(item.dn);
        if (!groups[rootDn]) {
            groups[rootDn] = [];
        }
        groups[rootDn].push(item);
    }

    const rootDns = _.keys(groups);

    return <>

        {rootDns.map((rootDn) => 
            <div key={rootDn}>
                <DnLink dn={rootDn} />
                <div className={styles.innerList}>
                    {groups[rootDn].map((item, index) => 
                        // <DnLink dn={item.dn} key={index} />
                        <div className={styles.entry}>
                            <div className={styles.entryDirection}>
                                {(item.direction == 'source') && <FontAwesomeIcon icon={faSignInAlt} />}
                                {(item.direction == 'target') && <FontAwesomeIcon icon={faSignOutAlt} />}
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
