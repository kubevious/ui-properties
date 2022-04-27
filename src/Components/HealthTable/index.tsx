import _ from 'the-lodash';
import React, { FC } from 'react';
import GaugeChart from 'react-gauge-chart'

import styles from './styles.module.css';


export interface HealthTableProps {
    config: any;
}

export const HealthTable: FC<HealthTableProps> = ({ config }) => {

    const chartStyle = {
        height: 90,
        width: 200,
    }
    return (
        <div className={styles.container}>

            <GaugeChart id="gauge-chart1" 
                        nrOfLevels={20} 
                        percent={0.20} 
                        style={chartStyle}
            />

            <GaugeChart id="gauge-chart2" 
                        nrOfLevels={20} 
                        percent={0.50} 
                        style={chartStyle}
            />

            {JSON.stringify(config, null, 4)}

        </div>
    );
};

