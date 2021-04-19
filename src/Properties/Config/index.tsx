import React, { FC, ReactNode, useEffect, useState } from 'react';
import hljs from 'highlight.js';
import { faDownload, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';
import { Controlled as CodeMirrorEditor } from 'react-codemirror2';
import _ from 'the-lodash';
import jsyaml from 'js-yaml';

import { CopyClipboard, DnComponent } from '@kubevious/ui-components';
import { Annotations } from './types';
import { Editor, EditorChange } from 'codemirror';
import { app } from '@kubevious/ui-framework';

import 'codemirror/theme/darcula.css';
import 'codemirror/lib/codemirror.css';

import styles from './styles.module.css';

export const sharedState = app.sharedState;

export interface ConfigProps {
    config: Annotations;
    dn: string;
    language?: string;
}

export const Config: FC<ConfigProps> = ({ config, dn, language }) => {
    const [indent, setIndent] = useState<number>(2);
    const [editMode, setEditMode] = useState<boolean>(false);

    const [code, setCode] = useState<string>(jsyaml.dump(config, { indent }));
    const [editedConfig, setEditedConfig] = useState<string>(code);

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
            setCode(jsyaml.dump(config, { indent }));
            setEditedConfig(jsyaml.dump(jsyaml.load(editedConfig), { indent }));
        } catch (error) {
            sharedState.set('is_error', true);
            sharedState.set('error', { data: error });
        }
    }, [indent, config]);

    const handleEditedMode = (): void => {
        setEditMode(!editMode);

        const PATHS_TO_UNSET = [
            'metadata.uid',
            'metadata.selfLink',
            'metadata.resourceVersion',
            'metadata.generation',
            'metadata.creationTimestamp',
            'metadata.managedFields',
            'status',
        ];

        if (!editMode) {
            const conf = _.cloneDeep(config);
            for (let p of PATHS_TO_UNSET) {
                _.unset(conf, p);
            }
            setEditedConfig(jsyaml.dump(conf, { indent }));
        }
    };

    const renderCode = (): ReactNode => {
        const result = language ? hljs.highlight(language, code) : '';

        return <pre>{result && result.value && <code dangerouslySetInnerHTML={{ __html: result.value }} />}</pre>;
    };

    const downloadFile = (): void => {
        const blob = new Blob([editMode ? editedConfig : code], { type: 'application/yaml' });
        const exportElem = document.getElementById('exportAnchor');
        exportElem?.setAttribute('href', window.URL.createObjectURL(blob));
        exportElem?.setAttribute('download', fileName);
        exportElem?.click();
    };

    const handleChangeConfig = ({ value }: { value: string }): void => {
        setEditedConfig(value);
    };

    return (
        <div className="Config-wrapper">
            {dn && (
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
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </button>

                            <button
                                className={cx(styles.configBtn, styles.download, styles.mr25)}
                                onClick={downloadFile}
                                title="Download"
                            >
                                <FontAwesomeIcon icon={faDownload} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className={cx(styles.configContainer, { [styles.editMode]: editMode })}>
                <CopyClipboard text={editMode ? editedConfig : code} />

                {!editMode && renderCode()}

                {editMode && (
                    <CodeMirrorEditor
                        value={editedConfig}
                        // autoScroll={false}
                        editorDidMount={(editor) => editor.refresh()}
                        options={{
                            mode: 'yaml',
                            theme: 'darcula',
                        }}
                        onBeforeChange={(_editor: Editor, _data: EditorChange, value: string) =>
                            handleChangeConfig({ value })
                        }
                    />
                )}
            </div>

            {editMode && (
                <div className={styles.configFooter}>
                    <span className="run-command">$ {kubectlCommand}</span>

                    <CopyClipboard text={kubectlCommand} />
                </div>
            )}
        </div>
    );
};
