import { theme } from './theme.js';
import { jsonLanguage } from '@codemirror/lang-json';
import CodeMirror from '@uiw/react-codemirror';
import { Controller } from 'react-hook-form';
import cn from './Arguments.module.css';

export const Arguments = ({ form, name}) => {
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
          name={name}
          control={control}
          render={({ field }) => (
            <CodeMirror
              {...field}
              className={cn.theme}
              theme={theme(errors)}
              extensions={[jsonLanguage]}
              basicSetup={{
                tabSize: 2,
              }}
            />
          )}
        />
      </div>
    </>
  );
};
