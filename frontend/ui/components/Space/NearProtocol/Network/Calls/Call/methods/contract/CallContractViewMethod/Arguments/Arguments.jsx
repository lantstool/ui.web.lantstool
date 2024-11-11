import { theme } from './theme.js';
import { jsonLanguage } from '@codemirror/lang-json';
import CodeMirror from '@uiw/react-codemirror';
import { Controller } from 'react-hook-form';
import cn from './Arguments.module.scss';

export const Arguments = ({ form }) => {
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <>
      <div className={cn.label}>
        <p className={cn.subtitle}>Arguments</p>
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
                className={cn.theme}
                theme={theme(errors)}
                extensions={[jsonLanguage]}
                basicSetup={{ tabSize: 2 }}
              />
            );
          }}
        />
      </div>
    </>
  );
};
