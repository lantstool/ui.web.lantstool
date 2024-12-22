import { useDropdownOptions } from './useDropdownOptions.js';
import { FormDropdown } from '../../../../../../../_general/dropdown/FormDropdown.jsx';
import { ImportKeyModal } from '../../../../_general/ImportKeyModal/ImportKeyModal.jsx';
import { useToggler } from '@hooks/useToggler.js';
import { useWatch } from 'react-hook-form';
import cn from './SignerKey.module.scss';

export const SignerKey = ({ form }) => {
  const { control, setValue } = form;
  const signerKey = useWatch({ control, name: 'signerKey' });
  const dropdownOptions = useDropdownOptions(control, signerKey);
  const [isModalOpen, openModal, closeModal] = useToggler();
  const options = [
    ...dropdownOptions,
    { value: 'importKey', label: 'Import key', icon: cn.importIcon },
  ];

  const onChange = (field) => (event) => {
    if (event?.value === 'importKey') {
      field.onChange(field.value);
      openModal();
    } else {
      field.onChange(event);
    }
  };

  const setKey = (value) => {
    setValue('signerKey', { value: value, label: value });
  };

  return (
    <div className={cn.signerKey}>
      <FormDropdown
        name="signerKey"
        control={control}
        onChange={onChange}
        options={options}
        isClearable={true}
        label="Access key"
      />
      {isModalOpen && <ImportKeyModal closeModal={closeModal} setKey={setKey} />}
    </div>
  );
};
