import _ from 'the-lodash'
import React from "react"

import "./styles.scss"

// value: { unit?: string, value: number } | string | number
export const PropertiesValue = (value: any): JSX.Element => {
    if (_.isNullOrUndefined(value)) {
        return <span>????</span>
    }

    if (_.isArray(value))
    {
        const str = (value as any[]).map(x => _.toString(x)).join(', ');
        return <span>{str}</span>
    }

    if (_.isObject(value)) {
        if (_.isNotNullOrUndefined((value as any).value))
        {
            const formattedValue = formatValue(value as ValueField)
            return (
                <span>
                    {formattedValue.value}
                    {formattedValue.unit && <span>{formattedValue.unit}</span>}
                </span>
            )
        }
        return <span>{_.stableStringify(value)}</span>
    } 
    
    return <span>{_.toString(value)}</span>
}

interface ValueField
{
    value: number
    unit?: string
}

interface FormattedValueField
{
    value: string
    unit?: string
}

function formatValue(value: ValueField) : FormattedValueField {
    switch (value.unit) {
        case "%":
            return {
                value: ((value.value as number) * 100).toFixed(2),
                unit: "%",
            }
        case "bytes":
            return formatMemory(value.value as number, 2)

        default:
            return {
                value: value.value.toFixed(2)
            }
    }
}

const MEMORY_SIZES = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
function formatMemory(
    value: number,
    decimals: number
): FormattedValueField {
    if (value === 0) return {
        value: '0',
        unit: MEMORY_SIZES[0]
    }
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const i = Math.floor(Math.log(value) / Math.log(k))
    return {
        value: (value / Math.pow(k, i)).toFixed(dm),
        unit: MEMORY_SIZES[i],
    }
}
