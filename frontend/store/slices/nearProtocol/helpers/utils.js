const getDropdownValueForExport = (value) => value?.value || '';
const getDropdownValueForImport = (value) => (value ? { value, label: value } : null);

export const utils = {
  getDropdownValueForExport,
  getDropdownValueForImport,
};
