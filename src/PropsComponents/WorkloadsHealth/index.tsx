import _ from 'the-lodash';
import React, { FC } from 'react';
import { GaugeBlock } from './GaugeBlock'

import styles from './styles.module.css';
import { WorkloadHealthConfig, WorkloadHealthMetric } from '@kubevious/entity-meta/dist/props-config/app-health';
import { MetricBlock } from '../../Components/MetricBlock';
import { BarDataPoint, HistogramBucketChart } from '../../Components/HistogramBucketChart';
import { BucketKeys } from '@kubevious/entity-meta/dist/props-config/histogram-bucket';

export interface WorkloadsHealthProps {
    config: WorkloadHealthConfig;
}

const GREEN='#5BE12C';
const YELLOW='#F5CD19';
const RED='#EA4228';

export const WorkloadsHealth: FC<WorkloadsHealthProps> = ({ config }) => {
    
    config = config ?? {};

    const readinessBarData = makePodReadinessStagesBarData(config);
    const restartedPodsBarData = makeRestartedPodsBarData(config);

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

            <div className={styles.barCharts}>
                <div className={styles.readinessStages}>
                    <HistogramBucketChart dataPoints={readinessBarData}
                                        title="Pods Readiness Stages" />
                </div>

                <div className={styles.restartedPods}>
                    <HistogramBucketChart dataPoints={restartedPodsBarData}
                                        title="Pods restarted during last" />
                </div>
            </div>

        </div>
    );
};


function makePodReadinessStagesBarData(config: WorkloadHealthConfig)
{
    const dataPoints: BarDataPoint[] = [
        makePodReadinessStagePoint("Scheduling", config.scheduling, "#52B69A"),
        makePodReadinessStagePoint("Initializing", config.initializing, "#34A0A4"),
        makePodReadinessStagePoint("Waiting Containers Ready", config.waitingContainersReady, "#168AAD"),
        makePodReadinessStagePoint("Waiting Conditions", config.waitingConditions, "#1A759F"),
        makePodReadinessStagePoint("Waiting Ready", config.waitingReady, "#1E6091"),
        makePodReadinessStagePoint("Ready", config.ready, "#184E77"),
    ];
    return dataPoints;
}

function makePodReadinessStagePoint(
    label: string,
    metric: WorkloadHealthMetric,
    backgroundColor: string,
    ) : BarDataPoint
{
    const count = metric?.count ?? 0;
    const perc = metric?.perc ?? 0;

    return {
        axisLabel: label,
        value: count,
        dataLabel: `${count} (${perc}%)`,
        backgroundColor: backgroundColor
    };
}

function makeRestartedPodsBarData(config: WorkloadHealthConfig)
{
    const restartedPods = config.restartedPods;
    if (!restartedPods) {
        return [];
    }

    const dataPoints: BarDataPoint[] = [
        {
            axisLabel: '15 min',
            value: restartedPods[BucketKeys.BUCKET_15_MINS],
            backgroundColor: '#9D0208'
            
        },
        {
            axisLabel: '1 hr',
            value: restartedPods[BucketKeys.BUCKET_1_HR],
            backgroundColor: '#D00000'
        },
        {
            axisLabel: '8 hr',
            value: restartedPods[BucketKeys.BUCKET_8_HRS],
            backgroundColor: '#DC2F02'
        },
        {
            axisLabel: '1 day',
            value: restartedPods[BucketKeys.BUCKET_1_DAY],
            backgroundColor: '#E85D04'
        },
    ];
    return dataPoints;
}