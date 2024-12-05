import { theme } from './theme.js';
import { jsonLanguage } from '@codemirror/lang-json';
import CodeMirror from '@uiw/react-codemirror';
import { Controller } from 'react-hook-form';
import { Tooltip } from '../../../../../../../../../_general/Tooltip/Tooltip.jsx';
import { CopyButton } from '../../../../../../../../../_general/CopyButton/CopyButton.jsx';
import cn from './Arguments.module.scss';

export const Arguments = ({ form }) => {
  const {
    control,
    formState: { errors },
    watch,
  } = form;

  const args = watch('args');
  const clear = () => form.setValue('args', '');

  return (
    <div>
      <div className={cn.label}>
        <p className={cn.title}>Arguments</p>
        <Tooltip content="Arguments" placement="top" defaultContent />
      </div>
      <div className={cn.controlPanel}>
        <p className={cn.subtitle}>json</p>
        <div className={cn.btnWrapper}>
          <Tooltip content="Format" placement="top" arrow={false}>
            <button className={cn.format} />
          </Tooltip>
          <Tooltip content="Copy" placement="top" arrow={false}>
            <CopyButton value={args} />
          </Tooltip>
          <Tooltip content="Clear" placement="top" arrow={false}>
            <button className={cn.clear} onClick={clear} />
          </Tooltip>
        </div>
      </div>
      <div className={cn.editorWrapper}>
        <Controller
          name="args"
          control={control}
          render={({ field }) => {
            const value = field.value ? field.value : '';
            return (
              <CodeMirror
                {...field}
                value={value}
                className={cn.editor}
                theme={theme(errors)}
                extensions={[jsonLanguage]}
                basicSetup={{ tabSize: 2 }}
              />
            );
          }}
        />
      </div>
    </div>
  );
};
