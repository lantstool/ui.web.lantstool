import { useSaveToHistory } from '@hooks/useSaveToHistory.js';
import logoLantstool from '@assets/logoLantstool.svg';
import { BackButton } from '../../_general/BackButton/BackButton.jsx';
import { RadioButton } from '../../_general/RadioButton/RadioButton.jsx';
import { useForm } from 'react-hook-form';
import { Button } from '../../_general/Button/Button.jsx';
import { useNavigate } from 'react-router-dom';
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
      <BackButton />
      <img className={cn.logo} src={logoLantstool} alt="#" />
      <div>
        <h1 className={cn.title}>Select a blockchain to work with</h1>
        <p className={cn.subtitle}>
          You will be able to switch between blockchains within this space.
        </p>
        <div className={cn.container}>
          <div className={cn.near}>
            <div className={cn.icon}>
              <span className={cn.nearIcon} />
            </div>
            <p className={cn.text}>NEAR Protocol</p>
            <div className={cn.radioBtn}>
              <RadioButton register={register} name="near" />
            </div>
          </div>
          <div className={cn.comingSoon}>
            <div className={cn.clock}>
              <span className={cn.clockIcon} />
            </div>
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
