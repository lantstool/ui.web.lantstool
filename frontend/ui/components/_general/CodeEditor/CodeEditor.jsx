import cn from './CodeEditor.module.scss';
import { Tooltip } from '../Tooltip/Tooltip.jsx';
import { CopyButton } from '../CopyButton/CopyButton.jsx';
import CodeMirror from '@uiw/react-codemirror';
import { theme } from './theme.js';
import { jsonLanguage } from '@codemirror/lang-json';
import { Controller } from 'react-hook-form';

export const CodeEditor = ({ control, copyValue, clear, error = null, name }) => (
  <div>
    <div className={cn.label}>
      <p className={cn.title}>Arguments</p>
      <Tooltip content="Arguments" placement="top" defaultContent />
    </div>
    <div className={error ? cn.errorPanel : cn.controlPanel}>
      <p className={cn.subtitle}>json</p>
      <div className={cn.btnWrapper}>
        {/*<Tooltip content="Format" placement="top" arrow={false}>*/}
        {/*  <button className={cn.format} />*/}
        {/*</Tooltip>*/}
        <Tooltip content="Copy" placement="top" arrow={false}>
          <CopyButton value={copyValue} />
        </Tooltip>
        <Tooltip content="Clear" placement="top" arrow={false}>
          <button className={cn.clear} onClick={clear} type="button" />
        </Tooltip>
      </div>
    </div>
    <div className={cn.editorWrapper}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <CodeMirror
            {...field}
            className={cn.editor}
            theme={theme(error)}
            extensions={[jsonLanguage]}
            basicSetup={{
              tabSize: 2,
            }}
          />
        )}
      />
    </div>
  </div>
);
