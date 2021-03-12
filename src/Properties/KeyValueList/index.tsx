import React from "react"

import "./styles.scss"
import { PropertiesValue } from "../helpers"
import { Config } from "./types"

export const KeyValueList = ({ config }: { config: Config }): JSX.Element => {
    return (
        <div className="KeyValueList-container">
            {Object.entries(config).map((item, index) => {
                const value = item[1];
                return (
                    <div data-testid="key-value-property" className="env-variable" key={index}>
                        <div className="name">{item[0]}:</div>
                        <div className="value">{PropertiesValue(value)}</div>
                    </div>
                )
            })}
        </div>
    )
}
