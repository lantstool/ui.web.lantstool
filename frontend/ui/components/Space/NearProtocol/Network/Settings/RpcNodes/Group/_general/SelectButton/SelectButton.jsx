import cn from './SelectButton.module.scss';
import cnm from 'classnames';

export const SelectButton = ({ isSelected, select, isDisabled }) => {
  return (
    <button
      className={cnm(cn.root, isSelected && cn.selectedRoot)}
      onClick={select}
      disabled={isDisabled}
    >
      <div />
    </button>
  );
};
