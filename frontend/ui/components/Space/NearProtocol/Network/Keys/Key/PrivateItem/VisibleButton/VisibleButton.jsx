import cn from './VisibleButton.module.scss';
import { Visibility } from '../../../../../../../_general/icons/Visibility.jsx';
import { VisibilityOff } from '../../../../../../../_general/icons/VisibilityOff.jsx';

export const VisibleButton = ({ visible, setVisible }) => {
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <>
      {visible ? (
        <button onClick={toggleVisibility} className={cn.button}>
          <VisibilityOff style={cn.icon} />
        </button>
      ) : (
        <button onClick={toggleVisibility} className={cn.button}>
          <Visibility style={cn.icon} />
        </button>
      )}
    </>
  );
};
