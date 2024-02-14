import { InputGroup } from '../../../../../../../../general/InputGroup/InputGroup.tsx';
import CodeMirror from '@uiw/react-codemirror';
import { jsonLanguage } from '@codemirror/lang-json';
import { useWatch } from 'react-hook-form';
import { theme } from './Theme.js';
import cn from './FunctionCall.module.css';
import { CopyButton } from '../../../../../../../general/CopyButton/CopyButton.tsx';

export const FunctionCall = ({ form, getName }: any) => {
  const {
    register,
    control,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = form;

  const argument = useWatch({ control, name: getName('arguments') });

  const onChange = (data: string) => {
    setValue(getName('arguments'), data);
  };

  const format = async () => {
    try {
      const parsedJson = JSON.parse(argument);
      const formattedJson = JSON.stringify(parsedJson, null, 2);
      setValue(getName('arguments'), formattedJson);
      clearErrors('arguments');
    } catch (e) {
      setError('arguments', { message: e.message });
    }
  };

  const clear = () => {
    setValue(getName('arguments'), '');
  };

  return (
    <>
      <InputGroup register={register} name={getName('methodName')} label="Method Name" />
      <h4 className={cn.title}>Arguments</h4>
      <div className={cn.buttonWrapper}>
        <button type="button" onClick={format}>
          Format
        </button>
        <button type="button" onClick={clear}>
          Clear
        </button>
        <CopyButton text={argument} />
        <p className={cn.errorMessage}>{errors.arguments?.message && 'Invalid JSON'}</p>
      </div>
      <CodeMirror
        value={argument}
        theme={theme(errors)}
        extensions={[jsonLanguage]}
        onChange={onChange}
      />

      <InputGroup register={register} name={getName('gas')} label="Gas (Tgas)" />
      <InputGroup register={register} name={getName('deposit')} label="Deposit (NEAR)" />
    </>
  );
};
