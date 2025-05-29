import { FieldTopbarLabel } from '../../FieldTopbarLabel/FieldTopbarLabel.jsx';
import { Tooltip } from '../../Tooltip/Tooltip.jsx';
import { CopyButton } from '../../CopyButton/CopyButton.jsx';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { theme } from './theme.js';
import { jsonLanguage } from '@codemirror/lang-json';
import { syntaxHighlighting } from '@codemirror/language';
import { highlightStyle } from './theme.js';
import { FieldErrorLabel } from '../../FieldErrorLabel/FieldErrorLabel.jsx';
import cnm from 'classnames';
import cn from './JsonEditor.module.scss';

const getEditorClass = (label, dynamicErrorSpace) => {
  if (!label && dynamicErrorSpace) return cn.editorNoLabelAndDynamicErrorSpace;
  if (label && dynamicErrorSpace) return cn.editorWithLabelAndDynamicErrorSpace;
  if (label && !dynamicErrorSpace) return cn.editorWithLabelAndStaticErrorSpace;
  if (!label && !dynamicErrorSpace) return cn.editorNoLabelAndStaticErrorSpace;
};

const getEditorExtensions = ({ withLineWrapping }) => {
  const extensions = [jsonLanguage, syntaxHighlighting(highlightStyle)];
  if (withLineWrapping) extensions.push(EditorView.lineWrapping);
  return extensions;
};

export const JsonEditor = ({
  value = '',
  onChange,
  onBlur,
  topbar,
  title = 'json',
  readOnly = false,
  showClearBtn = true,
  showCopyBtn = true,
  classes,
  error = null,
  dynamicErrorSpace,
  errorLabel,
  customTheme,
  withLineWrapping,
}) => {
  const clearValue = () => onChange('');
  const extensions = getEditorExtensions({ withLineWrapping });

  return (
    <div className={cnm(cn.container, classes?.container)}>
      {topbar && <FieldTopbarLabel label={topbar?.label} tooltip={topbar?.tooltip} />}
      <div className={error ? cn.errorPanel : cn.controlPanel}>
        <p className={cn.subtitle}>{title}</p>
        <div className={cn.btnWrapper}>
          {/*<Tooltip content="Format" placement="top" arrow={false}>*/}
          {/*  <button className={cn.format} />*/}
          {/*</Tooltip>*/}
          {showClearBtn && (
            <Tooltip content="Clear" placement="top" arrow={false}>
              <button className={cn.clear} onClick={clearValue} type="button" />
            </Tooltip>
          )}
          {showCopyBtn && (
            <Tooltip content="Copy" placement="top" arrow={false}>
              <CopyButton value={value} />
            </Tooltip>
          )}
        </div>
      </div>
      <hr className={cn.border} />
      <CodeMirror
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={cnm(getEditorClass(topbar?.label, dynamicErrorSpace), classes?.editor)}
        theme={theme(error, customTheme?.contentMinHeight)}
        readOnly={readOnly}
        extensions={extensions}
        basicSetup={{ tabSize: 2 }}
      />
      {errorLabel || <FieldErrorLabel error={error} dynamicErrorSpace={dynamicErrorSpace} />}
    </div>
  );
};
