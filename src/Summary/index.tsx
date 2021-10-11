import React from 'react';
import { ClassComponent } from '@kubevious/ui-framework';
import { PropertiesContents } from '../PropertiesContents';

import { isEmptyObject } from '../util';
import { SummaryState } from './types';

import styles from './styles.module.css';

export class Summary extends ClassComponent<{}, SummaryState> {
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {
            data: {},
        };
    }

    componentDidMount() {
        this.subscribeToSharedState('summary', (data) => {
            this.setState({ data });
        });
    }

    render() {
        const { data } = this.state;

        if (!isEmptyObject(data)) {
            return (
                <div id="summaryComponent" className={styles.summary}>
                    {Object.values(data).map((block) => (
                        <div className={styles.summaryContainer} key={block.id}>
                            <label>{block.title}</label>
                            <div className={styles.summaryContainerInner}>
                                <PropertiesContents group={block} />
                            </div>
                        </div>
                    ))}
                </div>
            );
        }
        return (
            <div data-testid="summary" id="summaryComponent" className={styles.loadingPlaceholder}>
                Loading...
            </div>
        );
    }
}
