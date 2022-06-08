import _ from 'the-lodash';
import jsyaml from 'js-yaml';

const TOP_LEVEL_ORDER = [
    'apiVersion',
    'kind',
    'metadata',
    'type',
    'spec',
    'data',
    'secrets',
    'roleRef',
    'subjects',
    'status',
];
const TOP_LEVEL_ORDER_DICT = _.makeDict(TOP_LEVEL_ORDER, x => x, () => true);

export function k8sConfigToString(config: any, indent: number) : string
{
    if (!config) {
        return '';
    }

    const newConfig = {};

    for(const key of TOP_LEVEL_ORDER)
    {
        const value = config[key];
        if (!_.isUndefined(value)) {
            newConfig[key] = value;
        }
    }

    for(const key of _.keys(config))
    {
        if (!TOP_LEVEL_ORDER_DICT[key]) {
            newConfig[key] = config[key];
        }
    }

    return jsyaml.dump(newConfig, { indent });
}