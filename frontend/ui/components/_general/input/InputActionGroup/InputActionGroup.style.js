import { selectStyles as defaultStyles } from '../../dropdown/Dropdown/dropdown.style.js';

export const selectStyles = (error) => {
  const styles = defaultStyles(error);

  return {
    ...styles,
    control: (baseStyles, state) => ({
      ...styles.control(baseStyles, state),
      cursor: 'pointer',
      color: '#495057',
      backgroundColor: 'fff',
      border: 'none',
      height: '38px',
      maxWidth: '220px',
      width: 'max-content',
      padding: '8px 12px',
      borderRadius: '0 8px 8px 0',
      ':hover': {
        ...styles.control(baseStyles, state)[':hover'],
        border: 'none',
      },
    }),
    menu: (styles) => ({
      ...styles,
      borderRadius: '8px',
      backgroundColor: '#FFFFFF',
      width: 'max-content',
      padding: 0,
      right: 0,
      color: '#495057',
    }),
    option: (baseStyles, state) => ({
      ...styles.option(baseStyles, state),
      display: 'flex',
      color: '#495057',
      justifyContent: 'center',
      flexDirection: 'column',
      fontSize: 14,
      borderRadius: '4px',
      height: '100%',
      maxWidth: '210px',
      minWidth: '124px',
      width: '100%',
      padding: '8px',
      whiteSpace: 'nowrap',
    }),
    singleValue: (styles) => ({
      ...styles,
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '20px',
      color: '#495057',
    }),
    dropdownIndicator: () => ({
      paddingLeft: '8px',
    }),
  };
};

