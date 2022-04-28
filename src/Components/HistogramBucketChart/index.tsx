import _ from 'the-lodash';
import React, { FC } from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


import styles from './styles.module.css';

export interface HistogramBucketChartProps {
  title?: string;
  dataPoints: BarDataPoint[];

  borderColor?: string | string[],
  backgroundColor?: string | string[],
}

export interface BarDataPoint
{
  axisLabel: string,
  value: number,
  dataLabel?: string,

  borderColor?: string,
  backgroundColor?: string,
}

export const HistogramBucketChart: FC<HistogramBucketChartProps> = ({
  title,
  dataPoints,
  borderColor,
  backgroundColor,
}) => {

  const options : React.ComponentProps<typeof Bar>['options'] = {
    maintainAspectRatio: false,
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      datalabels: {
        color: 'white',
        anchor: 'center',
        align: 'end',
        clamp: true,
        formatter: function(value, context) {
          const dataPoint = dataPoints[context.dataIndex]!;
          if (dataPoint.dataLabel) {
            return dataPoint.dataLabel;
          }
          return value;
        }
      }
    },
    scales: {
      x: {
          ticks: {
            display: false
          }
      },
      y: {
          ticks: {
            display: true,
            color: "white"
          }
      }
    }
  };

  if (title) {
    options.plugins!.title = {
      display: true,
      text: title,
      color: 'white'
    }
  }

  if (!backgroundColor) {
    backgroundColor = _.chain(dataPoints)
                   .map(x => x.backgroundColor)
                   .filter(x => _.isNotNullOrUndefined(x))
                   .map(x => x!)
                   .value()
  }

  if (!borderColor) {
    borderColor = _.chain(dataPoints)
                   .map(x => x.borderColor)
                   .filter(x => _.isNotNullOrUndefined(x))
                   .map(x => x!)
                   .value()
  }

  if (_.isNullOrUndefined(backgroundColor) || backgroundColor.length === 0) {
    backgroundColor = '#118ab2';
  }

  if (_.isNullOrUndefined(borderColor) || borderColor.length === 0) {
    borderColor = backgroundColor;
  }

  const data : React.ComponentProps<typeof Bar>['data'] = {
    labels: dataPoints.map(x => x.axisLabel),
    datasets: [
      {
        // label: 'Dataset 1',
        data: dataPoints.map(x => x.value),
        borderColor: borderColor,
        backgroundColor: backgroundColor
      }
    ],
  };

  const plugins : React.ComponentProps<typeof Bar>['plugins'] = [
    ChartDataLabels
  ];

  return (
    <div className={styles.container}>
      <Bar options={options} data={data} plugins={plugins} />
    </div>
  );

};

