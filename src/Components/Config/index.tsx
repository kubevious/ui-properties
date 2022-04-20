import React, { FC, useEffect, useState } from 'react';
import { FontAwesomeIcon, FASolidIcons } from '@kubevious/ui-components';
import cx from 'classnames';
import _ from 'the-lodash';
import jsyaml from 'js-yaml';

import { CodeControl, CopyClipboard, DnComponent } from '@kubevious/ui-components';
import { app } from '@kubevious/ui-framework';

import styles from './styles.module.css';

export const sharedState = app.sharedState;

export interface ConfigProps {
    config: any;
    dn: string;
    language?: string;
    isMaximized?: boolean;
}

export const Config: FC<ConfigProps> = ({ config, dn, language, isMaximized }) => {
    const [indent, setIndent] = useState<number>(2);
    const [editMode, setEditMode] = useState<boolean>(false);

    const [code, setCode] = useState<string>(configToString(config, indent));
    const [editedConfig, setEditedConfig] = useState<string>('');

    const [fileName, setFileName] = useState<string>('config.yaml');
    const [kubectlCommand, setKubectlCommand] = useState<string>('');

    useEffect(() => {
        const namespace = _.get(config, 'metadata.namespace');
        let nameParts = [];
        nameParts.push(_.get(config, 'kind'));
        nameParts.push(namespace);
        nameParts.push(_.get(config, 'metadata.name'));
        nameParts = nameParts.filter((x) => x);

        if (nameParts.length === 0) {
            nameParts.push('config');
        }

        nameParts = nameParts.map((x) => x.toLocaleLowerCase());

        const fn = nameParts.join('-') + '.yaml';
        setFileName(fn);

        let command = `kubectl apply -f ${fn}`;
        if (namespace) {
            command = command + ` -n ${namespace}`;
        }
        setKubectlCommand(command);
    }, []);

    useEffect(() => {
        try {
            setCode(configToString(config, indent));
            setEditedConfig(configToString(jsyaml.load(editedConfig), indent));
        } catch (error) {
            sharedState.set('is_error', true);
            sharedState.set('error', { data: error });
        }
    }, [indent, config]);

    const handleEditedMode = (): void => {

        const newEditMode = !editMode;
        setEditMode(newEditMode);

        if (newEditMode) {
            const conf = _.cloneDeep(config);
            for (const p of PATHS_TO_UNSET) {
                _.unset(conf, p);
            }
            setEditedConfig(configToString(conf, indent));
        }
    };

    const downloadFile = (): void => {
        const blob = new Blob([editMode ? editedConfig : code], { type: 'application/yaml' });
        const exportElem = document.getElementById('exportAnchor');
        exportElem?.setAttribute('href', window.URL.createObjectURL(blob));
        exportElem?.setAttribute('download', fileName);
        exportElem?.click();
    };

    return (
        <div className="Config-wrapper">
            {isMaximized && (
                <div className={styles.configHeader}>
                    <div className={styles.cluster}>
                        <DnComponent dn={dn} />
                    </div>

                    <div className={styles.blockHeader}>
                        <a id="exportAnchor" style={{ display: 'none' }} />
                        <h3>Config</h3>
                        <div className="buttons-group">
                            <span className={styles.tabLabel}>Tab Size</span>

                            <button
                                className={cx(styles.configBtn, { [styles.selected]: indent === 2 })}
                                onClick={() => setIndent(2)}
                                title="Set tab size to 2 spaces"
                            >
                                2
                            </button>

                            <button
                                className={cx(styles.configBtn, styles.mr25, { [styles.selected]: indent === 4 })}
                                onClick={() => setIndent(4)}
                                title="Set tab size to 4 spaces"
                            >
                                4
                            </button>

                            <button
                                className={cx(styles.configBtn, styles.mr25, { [styles.selected]: editMode })}
                                onClick={handleEditedMode}
                                title={`${editMode ? 'Disable' : 'Enable'} configuration editor`}
                            >
                                <FontAwesomeIcon icon={FASolidIcons.faPencilAlt} />
                            </button>

                            <button
                                className={cx(styles.configBtn, styles.download, styles.mr25)}
                                onClick={downloadFile}
                                title="Download"
                            >
                                <FontAwesomeIcon icon={FASolidIcons.faDownload} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className={cx(styles.configContainer, { [styles.editMode]: editMode })}>

                {!editMode && (
                    <CodeControl 
                        value={code}
                        syntax={(language === 'yaml') ? 'yaml' : 'json'}
                        indent={indent}
                        showCopyButton
                        />
                )}

                {editMode && (
                    <CodeControl 
                        value={editedConfig}
                        syntax={(language === 'yaml') ? 'yaml' : 'json'}
                        indent={indent}
                        handleChange={setEditedConfig}
                        showCopyButton
                        />
                )}
            </div>

            {editMode && (
                <div className={styles.configFooter}>
                    <span className={styles.runCommand}>$ {kubectlCommand}</span>

                    <CopyClipboard text={kubectlCommand} popupRight />
                </div>
            )}
        </div>
    );
};


const PATHS_TO_UNSET = [
    'metadata.uid',
    'metadata.selfLink',
    'metadata.resourceVersion',
    'metadata.generation',
    'metadata.creationTimestamp',
    'metadata.managedFields',
    'status',
];

const TOP_LEVEL_ORDER = [
    'apiVersion',
    'kind',
    'metadata',
    'spec',
    'data',
    'secrets',
    'roleRef',
    'subjects',
    'status',
];
const TOP_LEVEL_ORDER_DICT = _.makeDict(TOP_LEVEL_ORDER, x => x, () => true);

function configToString(config: any, indent: number) : string
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

    return jsyaml.dump(newConfig, { indent })   
}