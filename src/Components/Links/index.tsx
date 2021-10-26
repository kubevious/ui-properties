import _ from 'the-lodash';
import React, { FC } from 'react';
import { DnComponent, DnShortcutComponent, IconBox } from '@kubevious/ui-components';

import { TOP_ROOTS } from '@kubevious/entity-meta';

import styles from './styles.module.css';
import { LinksProps } from './types';
import { getRoot } from '../helpers';

export interface ControlLinkInfo
{
    kind : string;
    dn: string;
    path?: string;
    unresolved?: boolean;
}

export const Links: FC<LinksProps> = ({ config, options }) => {

    const groups : Record<string, ControlLinkInfo[]> = {};

    for(const kind of _.keys(config))
    {
        for(const linkInfo of config[kind])
        {
            const rootDn = getRoot(linkInfo.dn);
            if (!groups[rootDn]) {
                groups[rootDn] = [];
            }
            groups[rootDn].push({
                kind: kind,
                ...linkInfo
            });
        }
    }

    const rootDns = TOP_ROOTS.map(x => x.dn).filter(x => groups[x]);

    const setupTooltipContents = (item: ControlLinkInfo) => {
        return <div className={styles.tooltip}>
            <div>Link: <span className={styles.tooltipEmphasize}>{item.kind}</span></div>
            {item.path && <div>Path: <span className={styles.tooltipEmphasize}>{item.path}</span></div>}
        </div>;
    }

    return <>
        {rootDns.map((rootDn) => 
            {
                let myItemsRoot = rootDn;
                if (options?.relativeTo)
                {
                    if (options!.relativeTo!.startsWith(rootDn)) 
                    {
                        myItemsRoot = options!.relativeTo!;
                    }
                }

                return <div key={rootDn}>
                    <DnComponent dn={rootDn} options={{ relativeTo: 'root'}} />
                    
                    <div className={styles.innerList}>
                        {groups[rootDn].map((item, index) => 
                            <div className={styles.entry} key={index}>
                                <div className={styles.entryDirection}>
                                    <IconBox tooltipContentsFetcher={() => setupTooltipContents(item)} >
                                        <div className={styles.entryDirectionIcon} />
                                    </IconBox>
                                </div>

                                <div className={styles.entryDnExtra}>
                                    <DnShortcutComponent dn={item.dn} key={index} options={{
                                            relativeTo: myItemsRoot
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            }
        )}

        {/* {!isEmptyArray(config) &&
            config.map((item, index) => <DnShortcutComponent key={index} dn={item.dn}  />)} */}
    </>
}