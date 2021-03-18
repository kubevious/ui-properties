import React from "react"
import { PropertiesValue } from "../helpers"
import "./styles.scss"
import { Config } from "./types"

export const PropertiesCounters = ({ config }: { config: Config }) => {
    return (
        <div className="counters-container">
            {config &&
                config.map((element) => {
                    const propertiesValue = {
                        value: typeof element.value === 'object' ? element.value.value : element.value,
                        unit: element.unit || ''
                    }
                    return (
                    <div className="counter-block" key={element.title}>
                        <label>{element.title}</label>
                        <div className="counter-value">
                            {PropertiesValue(propertiesValue)}
                        </div>
                    </div>
                )})}
        </div>
    )
}
