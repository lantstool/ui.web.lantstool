import { FormJsonEditor } from '@gc/jsonEditor/FormJsonEditor.jsx';
import { transactionConfig } from '../../../../../_general/transactionConfig.js';
import { ActionBase } from '../_general/ActionBase/ActionBase.jsx';
import { FormInputActionGroup } from '@gc/input/FormInputActionGroup/FormInputActionGroup.jsx';
import { FormDropdown } from '@gc/dropdown/FormDropdown.jsx';
import { useAccountsOptions } from '../../../../../../_general/hooks/useAccountsOptions.js';
import { useContractMethodsOptions } from './useContractMethodsOptions.js';
import { useFunctionCallController } from './useFunctionCallController.js';
import { useWatch } from 'react-hook-form';
import { Option } from '../../../../../../Calls/Call/methods/contract/CallContractViewMethod/MethodName/OptionsLabel/OptionsLabel.jsx';
import cn from './FunctionCall.module.scss';

const gasOptions = [transactionConfig.gasUnits.TGas, transactionConfig.gasUnits.gas];
const depositOptions = [transactionConfig.nearUnits.NEAR, transactionConfig.nearUnits.yoctoNEAR];

export const FunctionCall = ({
  iconStyle,
  form,
  getName,
  removeAction,
  order,
                               loadContractFunctions,
}) => {
  const { control } = form;
  const ContractOptions = useAccountsOptions();
  const { isRestricted, hasCreateAccount } = useFunctionCallController(form, getName);
  const { options, argsTemplates } = useContractMethodsOptions(
    form,
    getName,
    order,
    loadContractFunctions,
  );
  const actions = useWatch({ control, name: 'actions' });

  const onChangeContract = (field) => (event) => {
    if (field.value?.value === event?.value) return;
    form.setValue('receiverId', event);
    actions.forEach((action, index) => {
      if (action.type === 'FunctionCall') {
        form.setValue(`actions.${index}.contractId`, event);
        form.setValue(`actions.${index}.methodName`, null);
        form.setValue(`actions.${index}.args`, '');
      }
    });
  };

  const onChangeMethods = (field) => (event) => {
    const { argsTemplate } = argsTemplates[event?.value] || '';
    form.setValue(getName('args'), argsTemplate);
    field.onChange(event);
  };

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
          onChange={onChangeContract}
        />
        <FormDropdown
          control={control}
          options={options}
          name={getName('methodName')}
          label="Method"
          isSearchable
          isClearable
          creatableSelect
          placeholder="Select or type..."
          onChange={onChangeMethods}
          components={{
            Option: (props) => <Option props={props} />,
          }}
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
