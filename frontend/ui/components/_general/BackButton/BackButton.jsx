import { useNavigate } from 'react-router-dom';
import { Button } from '../Button/Button.jsx';
import { ArrowLeftOutline } from '../icons/ArrowLeftOutline.jsx';
import cnm from 'classnames';
import cn from './BackButton.module.scss';

export const BackButton = ({ classes }) => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <div className={cnm(cn.container, classes?.container)}>
      <Button color="tertiary" size="small" IconLeft={ArrowLeftOutline} onClick={goBack}>
        Back
      </Button>
    </div>
  );
};
