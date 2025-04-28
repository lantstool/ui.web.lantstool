import { FormDropdown } from '@gc/dropdown/FormDropdown.jsx';
import { useParams } from 'react-router-dom';
import { useAccountsOptions } from '../../../../_general/hooks/useAccountsOptions.js';
import cn from './BeneficiaryId.module.scss';

export const BeneficiaryId = ({ control }) => {
  const { spaceId, networkId } = useParams();
  const options = useAccountsOptions([spaceId, networkId]);

  return (
    <div className={cn.beneficiaryId}>
      <FormDropdown
        name="beneficiaryId"
        control={control}
        options={options}
        creatableSelect
        isSearchable
        isClearable
        label="Beneficiary Id"
        placeholder="Select or type..."
      />
    </div>

  );
};
