import cn from './SelectButton.module.scss';
import cnm from 'classnames';

export const SelectButton = ({ isSelected, select, disabled }) => (
  <button
    className={cnm(cn.root, isSelected && cn.selectedRoot)}
    onClick={select}
    disabled={disabled}
  >
    <div />
  </button>
);
