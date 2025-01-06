import { useSaveToHistory } from '@hooks/useSaveToHistory.js';
import logoLantstool from '@assets/logoLantstool.svg';
import { RadioButton } from '../RadioButton/RadioButton.jsx';
import { Button } from '../Button/Button.jsx';
import cn from './SelectBlockchainForm.module.scss';

export const SelectBlockchainForm = ({ register, onClick, goBack, btnText }) => {
  useSaveToHistory();

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
      <div className={cn.btnWrapper}>
        {goBack && (
          <Button color="secondary" onClick={goBack}>
            Back
          </Button>
        )}
        <Button onClick={onClick}>{btnText}</Button>
      </div>
    </div>
  );
};
