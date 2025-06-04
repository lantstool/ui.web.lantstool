import { FormJsonEditor } from '@gc/jsonEditor/FormJsonEditor.jsx';
import { transactionConfig } from '../../../../../_general/transactionConfig.js';
import { ActionBase } from '../_general/ActionBase/ActionBase.jsx';
import { FormInputActionGroup } from '@gc/input/FormInputActionGroup/FormInputActionGroup.jsx';
import { FormDropdown } from '@gc/dropdown/FormDropdown.jsx';
import { useAccountsOptions } from '../../../../../../_general/hooks/useAccountsOptions.js';
import { useContractMethodsOptions } from '../../../../../../_general/hooks/useContractMethodsOptions.js';
import { useFunctionCallController } from './useFunctionCallController.jsx';
import cn from './FunctionCall.module.scss';

const gasOptions = [transactionConfig.gasUnits.TGas, transactionConfig.gasUnits.gas];
const depositOptions = [transactionConfig.nearUnits.NEAR, transactionConfig.nearUnits.yoctoNEAR];

export const FunctionCall = ({ iconStyle, form, getName, removeAction, order }) => {
  const { control } = form;
  const ContractOptions = useAccountsOptions();
  const methodNameOptions = useContractMethodsOptions(control, getName('contractId.value'));
  const { isRestricted, hasCreateAccount } = useFunctionCallController(form, getName);

  return (
    <ActionBase
      removeAction={removeAction}
      label="Function Call"
      order={order}
      color="purple"
      tooltipContent={
        <>
          Invokes a contract method.
          <br />• The arguments for the call must be provided in JSON format.
          <br />• Each call consumes gas to cover network fees, with a maximum of 300 TGas per call.
          <br />• During the call, it is possible to transfer a specified amount of NEAR to the
          contract. This is applicable only for methods that support a deposit.
          <br />• All contract methods can be invoked; however, for read-only methods it is more
          efficient to use Calls, as they do not incur gas fees.
          <br />• This action can be executed on behalf of any account if a Full Access Key is used.
        </>
      }
      iconStyle={iconStyle}
    >
      <div className={cn.container}>
        <FormDropdown
          control={control}
          options={ContractOptions}
          name={getName('contractId')}
          label="Contract ID"
          isSearchable
          isClearable
          creatableSelect
          placeholder="Select or type..."
          isDisabled={hasCreateAccount || isRestricted}
        />
        <FormDropdown
          control={control}
          options={methodNameOptions}
          name={getName('methodName')}
          label="Method"
          isSearchable
          isClearable
          creatableSelect
          placeholder="Select or type..."
        />
        <FormJsonEditor
          name={getName('args')}
          control={control}
          topbar={{
            label: 'Arguments',
          }}
          customTheme={{ contentMinHeight: '200px' }}
          classes={{ editor: cn.editor }}
        />
        <FormInputActionGroup
          control={control}
          name={getName('gas.amount')}
          label="Gas Limit"
          options={gasOptions}
          dropDownName={getName('gas.unit')}
          placeholder={0}
          copy
        />
        <FormInputActionGroup
          control={control}
          name={getName('deposit.amount')}
          label="Deposit"
          options={depositOptions}
          dropDownName={getName('deposit.unit')}
          dynamicErrorSpace
          placeholder={0}
          copy
        />
      </div>
    </ActionBase>
  );
};
