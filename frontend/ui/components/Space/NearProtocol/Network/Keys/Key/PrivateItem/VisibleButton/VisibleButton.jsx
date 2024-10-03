import cn from './VisibleButton.module.css';
import { Visibility } from '../../../../../../../_general/IconsComponents/Visibility.jsx';
import { VisibilityOff } from '../../../../../../../_general/IconsComponents/VisibilityOff.jsx';

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
