export const selectStyles = (error) => ({
  control: (styles, state) => ({
    ...styles,
    border: error
      ? '1px solid #e03131'
      : state.isFocused
        ? '1px solid #868E96'
        : '1px solid #e9ecef',
    boxShadow: 'none',
    height: '42px',
    padding: '8px 12px',
    lineHeight: '20px',
    fontSize: '16px',
    fontWeight: 400,
    backgroundColor: state.isDisabled ? '#E9ECEF' : 'none',
    borderRadius: '8px',
    ':hover': {
      border: error
        ? '1px solid #e03131'
        : state.isFocused
          ? '1px solid #868E96'
          : '1px solid #adb5bd',
    },
  }),
  placeholder: (styles) => ({
    ...styles,
    color: '#CED4DA',
    margin: 0,
    padding: 0,
    height: '22px',
  }),
  input: (styles) => ({
    ...styles,
    margin: 0,
    padding: 0,
    height: '22px',
  }),
  singleValue: (styles) => ({
    ...styles,
    margin: 0,
    padding: 0,
    height: '22px',
    color: '#212529',
  }),
  valueContainer: (styles) => ({
    ...styles,
    margin: 0,
    padding: 0,
    height: '22px',
  }),
  menu: (styles) => ({
    ...styles,
    borderRadius: '8px',
    backgroundColor: '#FFFFFF',
    padding: '4px',
    margin: '4px 0px 0px 0px',
  }),
  option: (styles, state) => ({
    ...styles,
    fontSize: 14,
    borderRadius: '4px',
    height: '32px',
    backgroundColor: !state.isSelected ? '#fff' : '#0075FF',
    color: state.isDisabled ? '#CED4DA' : state.isSelected ? '#ffffff' : '#212529',
    ':hover': {
      cursor: !state.isDisabled ? 'pointer' : 'default',
      backgroundColor: !state.isDisabled && !state.isSelected ? '#F1F3F5' : 'none',
    },
  }),
  dropdownIndicator: () => ({
    padding: 0,
  }),
  clearIndicator: () => ({
    padding: 0,
    marginLeft: '5px',
  }),
  indicatorSeparator: () => ({ display: 'none' }),
});
