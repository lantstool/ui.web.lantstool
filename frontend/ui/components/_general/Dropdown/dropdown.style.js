const getBorderColor = (state, error) => {
  if (state.isDisabled) return '#DEE2E6';
  if (error) return '#e03131';
  if (state.isFocused) return '#ADB5BD';
  return '#e9ecef';
};

const baseInputStyles = {
  margin: 0,
  padding: 0,
  height: '24px',
};

export const selectStyles = (error) => ({
  control: (styles, state) => ({
    ...styles,
    border: `1px solid ${getBorderColor(state, error)}`,
    boxShadow: 'none',
    height: '42px',
    padding: '8px 12px',
    lineHeight: '20px',
    fontSize: '16px',
    fontWeight: 400,
    color: state.isDisabled ? '#868E96' : '#f8f9fa',
    backgroundColor: state.isDisabled ? '#E9ECEF' : '#f8f9fa',
    borderRadius: '8px',
    ':hover': {
      border: `1px solid ${error ? '#e03131' : state.isFocused ? '#ADB5BD' : '#CED4DA'}`,
    },
  }),
  placeholder: (styles) => ({
    ...styles,
    color: '#CED4DA',
    ...baseInputStyles,
  }),
  input: (styles) => ({
    ...styles,
    ...baseInputStyles,
    maxWidth: '100px',
  }),
  singleValue: (styles, state) => ({
    ...styles,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    color: state.isDisabled ? '#868E96' : '#212529',
    ...baseInputStyles,
    height: '22px',
  }),
  valueContainer: (styles) => ({
    ...styles,
    ...baseInputStyles,
    height: '22px',
  }),
  menu: (styles) => ({
    ...styles,
    borderRadius: '8px',
    backgroundColor: '#FFFFFF',
    marginTop: '5px',
    width: '100%',
  }),
  menuList: (styles) => ({
    ...styles,
    borderRadius: '8px',
    padding: '4px',
    overflowY: 'auto',
    scrollbarWidth: 'none',

    //Scroll bar
    // padding: '0 2px 0 0',
    // margin: '4px 2px 4px 4px',
    // wordBreak: 'break-all',
    // '::-webkit-scrollbar': {
    //   width: '6px',
    //   height: '0px',
    // },
    // '::-webkit-scrollbar-track': {
    //   background: '#E9ECEF',
    //   borderRadius: '16px',
    // },
    // '::-webkit-scrollbar-thumb': {
    //   background: '#868E96',
    //   borderRadius: '16px',
    // },
  }),
  option: (styles, { isSelected, isDisabled, isFocused }) => ({
    ...styles,
    fontSize: 14,
    borderRadius: '4px',
    padding: '8px',
    backgroundColor: isDisabled
      ? undefined
      : isSelected
        ? 'none'
        : isFocused
          ? '#F1F3F5'
          : undefined,
    color: isDisabled ? '#CED4DA' : '#212529',
    ':hover': {
      cursor: isDisabled ? 'default' : 'pointer',
      backgroundColor: !isDisabled ? '#F1F3F5' : 'none',
    },
  }),
  group: (styles) => ({
    ...styles,
    padding: 0,
  }),
  groupHeading: (styles) => ({
    ...styles,
    margin: 0,
    padding: ' 16px 8px 8px 8px',
  }),
  dropdownIndicator: () => ({
    padding: 0,
  }),
  clearIndicator: (style) => ({
    ...style,
    padding: 0,
    marginLeft: '8px',
  }),
  indicatorSeparator: () => ({ display: 'none' }),
});
