import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import { getRandomBadge } from '../../../store/helpers/getRandomBadge.js';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema.js';
import { CreateSpaceForm } from '../_general/CreateSpaceForm/CreateSpaceForm.jsx';
import { BackButton } from '../_general/BackButton/BackButton.jsx';
import cn from './CreateSpace.module.scss';

export const CreateSpace = () => {
  const navigate = useNavigate();
  const create = useStoreEffect((store) => store.spaces.create);
  const randomBadge = getRandomBadge();

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: { spaceName: '', badge: randomBadge },
  });

  const onClick = form.handleSubmit((formValues) => {
    create({ formValues, navigate });
  });

  return (
    <div className={cn.createSpace}>
      <BackButton />
      <CreateSpaceForm form={form} onClick={onClick} btnText="Create space" backButton />
    </div>
  );
};
