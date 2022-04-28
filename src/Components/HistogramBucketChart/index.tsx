import _ from 'the-lodash';
import React, { FC } from 'react';

import styles from './styles.module.css';

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import { HistogramBucket, BucketKeys } from '@kubevious/entity-meta/dist/props-config/histogram-bucket'

export interface HistogramBucketChartProps {
  config: HistogramBucket
}

export const HistogramBucketChart: FC<HistogramBucketChartProps> = ({
  config
}) => {

  // const dataHorBar = {
  //   labels: ["January", "February", "March", "April", "May"],
  //   datasets: [
  //     {
  //       label: "",
  //       backgroundColor: ["#EC932F", "red", "green"],
  //       // borderColor: 'rgba(255,99,132,1)',
  //       borderWidth: 0,
  //       hoverBackgroundColor: "rgba(255,99,132,0.4)",
  //       hoverBorderColor: "rgba(255,99,132,1)",
  //       data: [65, 59, 80, 81, 56]
  //     }
  //   ]
  // };
  // const options = {
  //   legend: {
  //     display: false
  //   },
  //   scales: {
  //     xAxes: [
  //       {
  //         gridLines: {
  //           display: false,
  //           drawBorder: false
  //         },
  //         ticks: {
  //           display: false
  //         }
  //       }
  //     ],
  //     yAxes: [
  //       {
  //         gridLines: {
  //           display: false,
  //           drawBorder: false
  //         },
  //         ticks: {
  //           display: true,
  //           fontColor: "white"
  //         }
  //       }
  //     ]
  //   }
  // };


  const options = {
    indexAxis: 'y' as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Horizontal Bar Chart',
      },
    },
  };

  const labels = [
    '15 min',
    '1 hr',
    '8 hr',
    '1 day',
  ];

  const dataPoints = [
    config[BucketKeys.BUCKET_15_MINS],
    config[BucketKeys.BUCKET_1_HR],
    config[BucketKeys.BUCKET_8_HRS],
    config[BucketKeys.BUCKET_1_DAY],
  ]

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: dataPoints,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  return (
    <div className={styles.container}>
      <Bar options={options} data={data} />
    </div>
  );

};

