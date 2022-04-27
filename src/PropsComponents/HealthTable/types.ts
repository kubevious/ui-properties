export interface HealthMetric
{
    count: number;
    perc: number;
}

export interface AppPodsHealth
{
    pods: HealthMetric,
    pending: HealthMetric,
    running: HealthMetric,
    succeeded: HealthMetric,
    failed: HealthMetric,
    unknown: HealthMetric,

    scheduling: HealthMetric,
    initializing: HealthMetric,
    waitingContainersReady: HealthMetric,
    waitingConditions: HealthMetric,
    waitingReady: HealthMetric,
    ready: HealthMetric,
}