import { useSaveToHistory } from '@hooks/useSaveToHistory.js';
import logoLantstool from '@assets/logoLantstool.svg';
import { NearToken } from '../../_general/icons/NearToken.jsx';
import { RadioButton } from '../../_general/RadioButton/RadioButton.jsx';
import { useForm } from 'react-hook-form';
import { Button } from '../../_general/Button/Button.jsx';
import { useNavigate } from 'react-router-dom';
import { ClockCircleOutline } from '../../_general/icons/ClockCircleOutline.jsx';
import cn from './SelectBlockchain.module.scss';

export const SelectBlockchain = () => {
  const navigate = useNavigate();
  const { register } = useForm({ defaultValues: { near: '' } });

  useSaveToHistory();

  const handleClick = () => {
    navigate('../near-protocol/networks');
  };

  return (
    <div className={cn.selectBlockchain}>
      <img className={cn.logo} src={logoLantstool} alt="#" />
      <div>
        <h1 className={cn.title}>Select a blockchain to work with</h1>
        <p className={cn.subtitle}>
          You will be able to switch between blockchains within this space.
        </p>
        <div className={cn.container}>
          <div className={cn.near}>
            <NearToken style={cn.icon} />
            <p className={cn.text}>NEAR Protocol</p>
            <RadioButton register={register} name="near" />
          </div>
          <div className={cn.comingSoon}>
            <ClockCircleOutline style={cn.clock} />
            <div className={cn.wrapper}>
              <p className={cn.darkText}>More blockchains coming later</p>
              <p className={cn.lightText}>We are working hard on this...</p>
            </div>
          </div>
        </div>
      </div>
      <Button onClick={handleClick}>Select Blockchain</Button>
    </div>
  );
};
