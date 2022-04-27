import _ from 'the-lodash';
import React, { FC } from 'react';
import { GaugeBlock } from './GaugeBlock'
import { Row } from './Row';

import styles from './styles.module.css';
import { AppPodsHealth } from './types';
import { MetricBlock } from '../../Components/MetricBlock';


export interface HealthTableProps {
    config: AppPodsHealth;
}

const GREEN='#5BE12C';
const YELLOW='#F5CD19';
const RED='#EA4228';

export const HealthTable: FC<HealthTableProps> = ({ config }) => {
    
    config = config ?? {};

    return (
        <div className={styles.container}>

            <div className={styles.gauges}>

                <MetricBlock classNames={styles.commonBlock}
                             title="Pods"
                             value={config.pods?.count}
                             imageUrl={`/img/summary/pods.svg`}
                             />

                <GaugeBlock classNames={styles.commonBlock}
                            label="Running"
                            metric={config.running}
                            arcsLength={[0.2, 0.3, 0.4]}
                            colors={[RED, YELLOW, GREEN]}
                            />

                <GaugeBlock classNames={styles.commonBlock}
                            label="Succeeded"
                            metric={config.succeeded}
                            arcsLength={[0.5, 0.3, 0.2]}
                            colors={[RED, YELLOW, GREEN]}
                            />

                <GaugeBlock classNames={styles.commonBlock}
                            label="Failed"
                            metric={config.failed}
                            arcsLength={[0.1, 0.2, 0.7]}
                            colors={[GREEN, YELLOW, RED]}
                            />

                <GaugeBlock classNames={styles.commonBlock}
                            label="Pending"
                            metric={config.pending}
                            arcsLength={[0.2, 0.3, 0.5]}
                            colors={[GREEN, YELLOW, RED]}
                            />

                <GaugeBlock classNames={styles.commonBlock}
                            label="Unknown"
                            metric={config.unknown}
                            arcsLength={[0.1, 0.2, 0.7]}
                            colors={[GREEN, YELLOW, RED]}
                            />

            </div>

            <div className={styles.table}>

                <Row label="Scheduling" metric={config.scheduling}/>
                <Row label="Initializing" metric={config.initializing}/>
                <Row label="Waiting Containers Ready" metric={config.waitingContainersReady}/>
                <Row label="Waiting Conditions" metric={config.waitingConditions}/>
                <Row label="Waiting Ready" metric={config.waitingReady}/>
                <Row label="Ready" metric={config.ready}/>

            </div>

        </div>
    );
};
