import { FormSelect } from '../FormSelect/FormSelect.tsx';
import cn from './FormSelectGroup.module.css';
import { BalanceLabel } from './BalanceLabel/BalanceLabel.tsx';

export const FormSelectGroup = ({
  name,
  control,
  onChange = false,
  isSearchable = false,
  isClearable = false,
  options,
  components,
  children,
  error = false,
  creatableSelect = false,
  accountId,
  label,
}: any) => {
  return (
    <>
      {children ? (
        children
      ) : (
        <div className={cn.label}>
          <p className={cn.subtitle}>{label}</p>
          <BalanceLabel accountId={accountId} />
        </div>
      )}
      <div className={cn.errorSelect}>
        <FormSelect
          name={name}
          control={control}
          onChange={onChange}
          isSearchable={isSearchable}
          isClearable={isClearable}
          options={options}
          components={components}
          creatableSelect={creatableSelect}
          error={error}
        />
      </div>
      <div className={cn.error}>{error}</div>
    </>
  );
};
