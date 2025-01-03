import { useDropdownOptions } from './useDropdownOptions.js';
import { FormDropdown } from '../../../../../../../_general/dropdown/FormDropdown.jsx';
import { ImportKeyModal } from '../../../../_general/ImportKeyModal/ImportKeyModal.jsx';
import { useToggler } from '@hooks/useToggler.js';
import { useWatch } from 'react-hook-form';
import { useRef } from 'react';
import { createPrivateKeySchema } from './privateKeySchema.js';
import { createSeedPhraseSchema } from './seedPhraseSchema.js';
import { useParams } from 'react-router-dom';
import { MenuList } from '../_general/MenuList/MenuList.jsx';
import cn from './SignerKey.module.scss';

export const SignerKey = ({ form }) => {
  const { spaceId, networkId } = useParams();
  const { control, setValue } = form;
  const signerKey = useWatch({ control, name: 'signerKey' });
  const dropdownOptions = useDropdownOptions(control, signerKey);
  const [isModalOpen, openModal, closeModal] = useToggler();
  const ref = useRef(null);
  const signerId = useWatch({ control, name: 'signerId.value' });

  const privateKeySchema = createPrivateKeySchema(spaceId, networkId, signerId);
  const seedPhraseSchema = createSeedPhraseSchema(spaceId, networkId, signerId);

  const setKey = (value) => {
    setValue('signerKey', { value: value, label: value });
  };

  const onClick = () => {
    openModal();
    ref.current.blur();
  };

  return (
    <div className={cn.signerKey}>
      <FormDropdown
        name="signerKey"
        control={control}
        options={dropdownOptions}
        isClearable={true}
        label="Access key"
        isDisabled={!signerId}
        dropdownRef={ref}
        placeholder="Select or type..."
        components={{
          MenuList: (props) => (
            <MenuList props={props} onClick={onClick} icon={cn.importIcon} title="Import key" />
          ),
        }}
      />
      {isModalOpen && (
        <ImportKeyModal
          closeModal={closeModal}
          setKey={setKey}
          privateKeySchema={privateKeySchema}
          seedPhraseSchema={seedPhraseSchema}
        />
      )}
    </div>
  );
};
