import { selectStyles as defaultStyles } from '../Dropdown/dropdown.style.js';

export const selectStyles = (error) => {
  const styles = defaultStyles(error);

  return {
    ...styles,
    control: (baseStyles, state) => ({
      ...styles.control(baseStyles, state),
      cursor: 'pointer',
      border: 'none',
      height: '40px',
      width: '100%',
      borderRadius: '8px 0 0 8px',
      ':hover': {
        ...styles.control(baseStyles, state)[':hover'],
        border: 'none',
      },
    }),
  };
};
