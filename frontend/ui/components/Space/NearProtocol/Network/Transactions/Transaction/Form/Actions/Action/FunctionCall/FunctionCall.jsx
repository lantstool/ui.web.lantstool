import { FormJsonEditor } from '../../../../../../../../../_general/jsonEditor/FormJsonEditor.jsx';
import { transactionConfig } from '../../../../../_general/transactionConfig.js';
import { ActionBase } from '../_general/ActionBase/ActionBase.jsx';
import { FormInputActionGroup } from '../../../../../../../../../_general/input/FormInputActionGroup/FormInputActionGroup.jsx';
import { FormDropdown } from '../../../../../../../../../_general/dropdown/FormDropdown.jsx';
import { Tooltip } from '../../../../../../../../../_general/Tooltip/Tooltip.jsx';
import { useAccountsOptions } from '../../../../../../_general/hooks/useAccountsOptions.js';
import { useContractMethodsOptions } from '../../../../../../_general/hooks/useContractMethodsOptions.js';
import cn from './FunctionCall.module.scss';

const gasOptions = [transactionConfig.gasUnits.TGas, transactionConfig.gasUnits.gas];
const depositOptions = [transactionConfig.nearUnits.NEAR, transactionConfig.nearUnits.yoctoNEAR];

export const FunctionCall = ({ iconStyle, form, getName, removeAction, order }) => {
  const { control } = form;
  const ContractOptions = useAccountsOptions();
  const methodNameOptions = useContractMethodsOptions(control, getName('contractId.value'));

  return (
    <ActionBase
      removeAction={removeAction}
      label="Function Call"
      order={order}
      color="purple"
      tooltipContent="Functioin Call"
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
          copy={false}
          tooltip={<Tooltip content="Contract id" placement="top" defaultContent />}
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
          copy={false}
          tooltip={<Tooltip content="Method name" placement="top" defaultContent />}
        />
        <FormJsonEditor
          name={getName('args')}
          control={control}
          topbar={{
            label: 'Arguments',
            tooltip: (
              <>
                Type contract call arguments <br /> in JSON format
              </>
            ),
          }}
          customTheme={{ contentMinHeight: '200px' }}
          classes={{ editor: cn.editor }}
        />
        <div className={cn.wrapper}>
          <FormInputActionGroup
            control={control}
            name={getName('gas.amount')}
            label="Gas Limit"
            options={gasOptions}
            dropDownName={getName('gas.unit')}
            dynamicErrorSpace
            placeholder={0}
            tooltip={<Tooltip content="Gas Limit" placement="top" defaultContent />}
          />
          <FormInputActionGroup
            control={control}
            name={getName('deposit.amount')}
            label="Deposit"
            options={depositOptions}
            dropDownName={getName('deposit.unit')}
            dynamicErrorSpace
            placeholder={0}
            tooltip={<Tooltip content="Deposit" placement="top" defaultContent />}
          />
        </div>
      </div>
    </ActionBase>
  );
};
