import { selectStyles as defaultStyles } from '../Dropdown/dropdown.style.js';

export const selectStyles = (error) => {
  const styles = defaultStyles(error);

  return {
    ...styles,
    control: (baseStyles, state) => ({
      ...styles.control(baseStyles, state),
      cursor: 'pointer',
      backgroundColor: 'fff',
      border: 'none',
      height: '40px',
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
    }),
    option: (baseStyles, state) => ({
      ...styles.option(baseStyles, state),
      display: 'flex',
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
    dropdownIndicator: () => ({
      paddingLeft: '8px',
    }),
  };
};
// export const selectStyles = () => ({
//   control: (styles, state) => ({
//     ...styles,
//     border: 'none',
//     boxShadow: 'none',
//     height: '40px',
//     padding: '8px 12px',
//     lineHeight: '20px',
//     fontSize: '16px',
//     fontWeight: 400,
//     backgroundColor: '#fff',
//     borderRadius: '0 8px 8px 0',
//     maxWidth: '220px',
//     width: 'max-content',
//     ':hover': {
//       border: 'none',
//       cursor: state.isDisabled ? 'none' : 'pointer',
//     },
//   }),
//   placeholder: (styles) => ({
//     ...styles,
//     color: '#CED4DA',
//     margin: 0,
//     padding: 0,
//     height: '22px',
//   }),
//   input: (styles) => ({
//     ...styles,
//     margin: 0,
//     padding: 0,
//   }),
//   singleValue: (styles, state) => ({
//     ...styles,
//     margin: 0,
//     padding: 0,
//     color: state.isDisabled ? '#CED4DA' : '#212529',
//   }),
//   valueContainer: (styles) => ({
//     ...styles,
//     margin: 0,
//     padding: 0,
//     height: '24px',
//   }),
//   menu: (styles) => ({
//     ...styles,
//     borderRadius: '8px',
//     backgroundColor: '#FFFFFF',
//     margin: '5px 0px 0px 0px',
//     width: 'max-content',
//     padding: 0,
//     right: 0,
//   }),
//   menuList: (styles) => ({
//     ...styles,
//     borderRadius: '8px',
//     padding: '4px',
//   }),
//   option: (styles, state) => ({
//     ...styles,
//     display: 'flex',
//     justifyContent: 'center',
//     flexDirection: 'column',
//     fontSize: 14,
//     borderRadius: '4px',
//     height: '100%',
//     minHeight: '32px',
//     maxWidth: '210px',
//     width: '100%',
//     padding: '6px 8px',
//     wordBreak: 'break-word',
//     backgroundColor: !state.isSelected ? '#fff' : '#0075FF',
//     color: state.isDisabled ? '#CED4DA' : state.isSelected ? '#ffffff' : '#212529',
//     ':hover': {
//       cursor: !state.isDisabled ? 'pointer' : 'default',
//       backgroundColor: !state.isDisabled && !state.isSelected ? '#F1F3F5' : 'none',
//     },
//   }),
//   dropdownIndicator: () => ({
//     paddingLeft: '8px',
//   }),
//   indicatorSeparator: () => ({ display: 'none' }),
// });