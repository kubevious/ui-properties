import React from 'react';
import cx from 'classnames';
import { Column, Config, Row, Header } from './types';
import { DnOptions } from '../../types';
import { DnShortcutComponent } from '@kubevious/ui-components';
import { PropertiesValue } from '../helpers';

import styles from './styles.module.css';

export const Table = ({ config, options }: { config: Config; options?: DnOptions }) => {
    const tableHeaders = (): Column[] => {
        return config.headers.map((x: Header | string) => {
            const column: Column = {};
            if (typeof x !== 'string') {
                column.name = x.id;
                if (x.label) {
                    column.label = x.label;
                }

                if (x.kind) {
                    column.formatter = x.kind;
                }
            } else {
                column.name = x;
            }
            if (!column.label) {
                column.label = column.name;
            }
            return column;
        });
    };

    const renderRow = (row: Row | string, column: Column): JSX.Element => {
        let cell: string;
        if (column.name) {
            cell = row[column.name];
        } else if (typeof row === 'string') {
            cell = row;
        } else {
            cell = '';
        }

        return (
            <td key={column.name}>
                {column.formatter ? renderColumnFormatter(column.formatter, cell) : PropertiesValue(cell)}
            </td>
        );
    };

    const renderColumnFormatter = (formatter: string, cell: string): JSX.Element | undefined => {
        if (formatter === 'check') return renderRowCheckbox(cell);
        if (formatter === 'shortcut') return <DnShortcutComponent dn={cell} options={options} />;
        return;
    };

    const renderRowCheckbox = (value: string) => (
        <div
            className={cx(styles.propertiesCheckbox, {
                [styles.checked]: value,
                [styles.unchecked]: !value,
            })}
        />
    );

    return (
        <div className={cx('PropertiesTable-container', styles.container)}>
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        {tableHeaders().map((item) => (
                            <th key={item.name}>{item.label || item.name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {config &&
                        config.rows.map((row, index) => (
                            <tr key={index}>{tableHeaders().map((column) => renderRow(row, column))}</tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};
