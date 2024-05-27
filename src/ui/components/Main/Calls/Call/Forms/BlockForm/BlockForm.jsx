import { SelectSearchType } from '../general/SelectSearchType/SelectSearchType.jsx';

export const BlockForm = ({ form, type }) => type === 'block' && <SelectSearchType form={form} />;
