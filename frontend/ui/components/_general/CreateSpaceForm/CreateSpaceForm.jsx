import logoLantstool from '@assets/logoLantstool.svg';
import { Button } from '../Button/Button.jsx';
import { FormInput } from '../input/FormInput/FormInput.jsx';
import { BadgeSelector } from '../BadgeSelector/BadgeSelector.jsx';
import cn from './CreateSpaceForm.module.scss';

export const CreateSpaceForm = ({ form, onClick, btnText }) => {
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <div className={cn.createSpace}>
      <div className={cn.head}>
        <img src={logoLantstool} alt="Lantstool Logo - 3 circles with the app name" />
      </div>
      <div className={cn.container}>
        <h1 className={cn.title}>Let’s create your space</h1>
        <h1 className={cn.liteTitle}>Name it whatever you prefer</h1>
        <div className={cn.wrapper}>
          <FormInput
            control={control}
            name="spaceName"
            placeholder="My workspace"
            copy={false}
            error={errors?.spaceName?.message}
          />
          <BadgeSelector form={form} />
        </div>
      </div>
      <Button onClick={onClick}>{btnText}</Button>
    </div>
  );
};
