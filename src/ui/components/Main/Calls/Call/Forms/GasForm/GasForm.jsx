import { SelectType } from './SelectType/SelectType.jsx';

export const GasForm = ({ form, type }) => type === 'gas_price' && <SelectType form={form} />;
