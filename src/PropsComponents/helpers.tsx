import _ from 'the-lodash';
import React from 'react';
import { makeDn, parseDn } from '@kubevious/entity-meta/dist';

export const PropertiesValue = (value: any): JSX.Element => {
    if (_.isNullOrUndefined(value)) {
        return <span></span>;
    }

    if (_.isArray(value)) {
        const str = (value as any[]).map((x) => _.toString(x)).join(', ');
        return <span>{str}</span>;
    }

    if (_.isObject(value)) {
        if (_.isNotNullOrUndefined((value as any).value)) {
            const formattedValue = formatValue(value as ValueField);
            return (
                <span>
                    {formattedValue.value}
                    {formattedValue.unit && <span>{formattedValue.unit}</span>}
                </span>
            );
        }
        return <span>{_.stableStringify(value)}</span>;
    }

    return <span>{_.toString(value)}</span>;
};

export interface ValueField {
    value: number;
    unit?: string;
}

export interface FormattedValueField {
    value: string;
    unit?: string;
}

export function formatValue(value: ValueField): FormattedValueField {
    if (!_.isNumber(value.value)) {
        return {
            value: _.toString(value.value),
        };
    }

    switch (value.unit) {
        case '%':
            return {
                value: formatNumber((value.value as number) * 100),
                unit: '%',
            };
        case 'bytes':
            return formatMemory(value.value as number);

        default:
            return {
                value: formatNumber(value.value),
            };
    }
}

export const MEMORY_SIZES = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

export function formatMemory(value: number): FormattedValueField {
    if (value === 0)
        return {
            value: '0',
            unit: MEMORY_SIZES[0],
        };
    const k = 1024;
    const i = Math.floor(Math.log(value) / Math.log(k));
    return {
        value: formatNumber(value / Math.pow(k, i)),
        unit: MEMORY_SIZES[i],
    };
}

export function formatNumber(value: number): string {
    return (Math.round(value * 100) / 100).toString();
}

export const camelCase = (str: string): string => {
    if (!str) {
        return "";
    }
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
        if (+match === 0) return '';
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
}


export function getRoot(dn: string)
{   
    const parts = parseDn(dn);
    if (parts.length <= 2) {
        return dn;
    }
    return makeDn(parts[0].rn, parts[1].rn);
}
