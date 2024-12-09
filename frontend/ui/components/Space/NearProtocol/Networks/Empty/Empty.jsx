import { Button } from '../../../../_general/Button/Button.jsx';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '../../../../_general/BackButton/BackButton.jsx';
import cn from './Empty.module.scss';

export const Empty = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('create');
  };

  return (
    <div className={cn.empty}>
      <BackButton  />
      <div className={cn.wrapper}>
        <span className={cn.icon}/>
        <h2 className={cn.title}>
          Nothing here. Click "Add network" to set up your first one.
        </h2>
      </div>
      <Button onClick={handleClick}>Add Network</Button>
    </div>
  );
};
