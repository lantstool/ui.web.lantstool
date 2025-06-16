import { Button } from '@gc/Button/Button.jsx';
import { FormDropdown } from '@gc/dropdown/FormDropdown.jsx';
import { FormInput } from '@gc/input/FormInput/FormInput.jsx';
import { useState } from 'react';
import { BaseModal } from '@gc/modals/BaseModal/BaseModal.jsx';
import { ModalFooter } from '@gc/modals/ModalFooter/ModalFooter.jsx';
import { ModalHeader } from '@gc/modals/ModalHeader/ModalHeader.jsx';
import { FormTextarea } from '@gc/FormTextarea/FormTextarea.jsx';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import cn from './Feedback.module.scss';

const feedbackType = [
  {
    label: 'Ask a question',
    value: 'Ask a question',
  },
  {
    label: 'Report a bug',
    value: 'Report a bug',
  },
  {
    label: 'Suggest an improvement',
    value: 'Suggest an improvement',
  },
];

export const Feedback = () => {
  const [open, setOpen] = useState(false);
  const form = useForm({});
  const { control } = form;
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const sendFeedback = () => console.log('send feedback');


  return (
    <>
      <Button color="secondary" size="small" onClick={openModal}>
        Feedback
      </Button>
      {open && (
        <BaseModal close={closeModal}>
          <ModalHeader close={closeModal} title={'Send your feedback for us'} />
          <FormInput
            name="name"
            control={control}
            label="Name"
            dynamicErrorSpace
            placeholder="Jhon"
          />
          <FormInput
            name="email"
            control={control}
            label="Email"
            dynamicErrorSpace
            placeholder="email@example.com"
          />
          <FormDropdown
            control={control}
            options={feedbackType}
            label="Feedback type"
            name={'feedbackType'}
            placeholder="Select feedback type..."
          />
          <div className={cn.textareaContainer}>
            <p className={cn.message}>Message</p>
            <FormTextarea control={control} name="message" label="Message" rows={5} dynamicErrorSpace />
            <p className={cn.subtitle}>
              To send additional files, please use the{' '}
              <Link className={cn.telegram} target="_blank" to="https://t.me/+TyHdG_WXJmViZDVi">
                Telegram
              </Link>
              .
            </p>
          </div>
          <ModalFooter
            close={closeModal}
            action={{ label: 'Send feedback', onClick: sendFeedback }}
          />
        </BaseModal>
      )}
    </>
  );
};
