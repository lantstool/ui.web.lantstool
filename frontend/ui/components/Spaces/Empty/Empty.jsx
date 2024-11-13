import spaceWindowBold from '@assets/spaceWindowBold.svg';
import { Button } from '../../_general/Button/Button.jsx';
import { useNavigate } from 'react-router-dom';
import cn from './Empty.module.scss';

export const Empty = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/spaces/create");
  };

  return (
    <div className={cn.empty}>
      <div className={cn.wrapper}>
        <img src={spaceWindowBold} alt="#" />
        <h2 className={cn.title}>
          Your spaces await! <br />
          Tap “Create space” to start your first one.
        </h2>
      </div>
      <Button onClick={handleClick}>Create space</Button>
    </div>
  );
};
