import { useNavigate } from 'react-router-dom';
import { Button } from '../Button/Button.jsx';
import { ArrowLeftOutline } from '../icons/ArrowLeftOutline.jsx';

export const BackButton = ({ classes }) => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <div className={classes?.container}>
      <Button color="tertiary" size="small" IconLeft={ArrowLeftOutline} onClick={goBack}>
        Back
      </Button>
    </div>
  );
};
