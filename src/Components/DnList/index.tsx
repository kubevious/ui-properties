import _ from 'the-lodash';
import React, { FC } from 'react';
import { DnComponent, DnShortcutComponent } from '@kubevious/ui-components';
import { TOP_ROOTS } from '@kubevious/entity-meta';
import { DnOptions } from '../../types';
import { getRoot } from '../helpers';

import styles from './styles.module.css';

export interface DnListProps {
    config: string[];
    options?: DnOptions;
}

export const DnList: FC<DnListProps> = ({ config, options }) => {
    
    const groups : Record<string, string[]> = {};

    for(const dn of config)
    {
        const rootDn = getRoot(dn);
        if (!groups[rootDn]) {
            groups[rootDn] = [];
        }
        groups[rootDn].push(dn);
    }

    for(const rootDn of _.keys(config))
    {
        groups[rootDn] = _.orderBy(groups[rootDn]);
    }

    const rootDns = TOP_ROOTS.map(x => x.dn).filter(x => groups[x]);

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
                            <DnShortcutComponent dn={item} key={index} options={{
                                    relativeTo: myItemsRoot
                                }}
                            />
                        )}
                    </div>
                </div>
            }
        )}
    </>
    
    // return <div className={styles.container}>
    //     {!isEmptyArray(config) &&
    //         config.map((item, index) => <DnShortcutComponent key={index} dn={item} options={options} />)}
    // </div>
}
