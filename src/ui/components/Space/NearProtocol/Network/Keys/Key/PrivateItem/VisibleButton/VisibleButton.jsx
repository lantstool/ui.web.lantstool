import cn from './VisibleButton.module.css';
import { Visibility } from '../../../../../../../../assets/components/Visibility.jsx';
import { VisibilityOff } from '../../../../../../../../assets/components/VisibilityOff.jsx';

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
