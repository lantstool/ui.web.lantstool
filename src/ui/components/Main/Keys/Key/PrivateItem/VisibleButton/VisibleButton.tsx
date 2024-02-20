import cn from './VisibleButton.module.css';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

export const VisibleButton = ({ visible, setVisible }: any) => {
  const toggleVisibility = () => {
    setVisible(!visible);
  };
  return (
    <>
      {visible ? (
        <button onClick={toggleVisibility} className={cn.button}>
          <VisibilityOffOutlinedIcon className={cn.icon} sx={{ fontSize: 22 }} />
        </button>
      ) : (
        <button onClick={toggleVisibility} className={cn.button}>
          <VisibilityRoundedIcon className={cn.icon} sx={{ fontSize: 22 }} />
        </button>
      )}
    </>
  );
};
