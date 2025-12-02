import { Button } from '@gc/Button/Button.jsx';
import { FormDropdown } from '@gc/dropdown/FormDropdown.jsx';
import { FormInput } from '@gc/input/FormInput/FormInput.jsx';
import { useState } from 'react';
import { BaseModal } from '@gc/modals/BaseModal/BaseModal.jsx';
import { ModalFooter } from '@gc/modals/ModalFooter/ModalFooter.jsx';
import { ModalHeader } from '@gc/modals/ModalHeader/ModalHeader.jsx';
import { FormTextarea } from '@gc/FormTextarea/FormTextarea.jsx';
import { useForm } from 'react-hook-form';
import { schema } from './schema.js';
import { zodResolver } from '@hookform/resolvers/zod';
import { useStoreEffect } from '@react-vault';
import { Link } from 'react-router-dom';
import { contactOptions, feedbackOptions } from './dropdownOptions.js';
import cn from './Feedback.module.scss';

export const Feedback = () => {
  const [open, setOpen] = useState(false);
  const sendFeedback = useStoreEffect((store) => store.spaces.sendFeedback);

  const form = useForm({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      contactMethod: { value: '' },
      contactInfo: '',
      feedbackType: { value: '' },
      message: '',
    },
  });

  const {
    control,
    reset,
    trigger,
    formState: { touchedFields },
  } = form;

  const openModal = () => setOpen(true);
  const closeModal = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = form.handleSubmit((formValues) => {
    sendFeedback({ formValues, closeModal });
  });

  const onChange = (field) => (event) => {
    field.onChange(event);
    if (touchedFields.contactInfo) {
      trigger('contactInfo');
    }
  };

  return (
    <>
      <Button color="secondary" size="small" onClick={openModal}>
        Feedback
      </Button>
      {open && (
        <BaseModal close={closeModal} classes={{ modal: cn.modal }}>
          <ModalHeader
            close={closeModal}
            title="Send your feedback for us"
            classes={{ container: cn.header }}
          />
          <FormInput name="name" control={control} label="Name (optionally)" placeholder="Jhon" />
          <FormDropdown
            control={control}
            options={contactOptions}
            onChange={onChange}
            copy={false}
            label="Сontact method"
            name="contactMethod"
            placeholder="Select contact method..."
          />
          <FormInput
            name="contactInfo"
            control={control}
            label="Сontact info"
            placeholder="email@example.com"
          />
          <FormDropdown
            control={control}
            options={feedbackOptions}
            copy={false}
            label="Feedback type"
            name="feedbackType"
            placeholder="Select feedback type..."
          />
          <div className={cn.textareaContainer}>
            <p className={cn.message}>Message</p>
            <FormTextarea control={control} name="message" label="Message" rows={5} />
          </div>
          <div className={cn.footer}>
            <p className={cn.subtitle}>
              To send additional files, please use the{' '}
              <Link className={cn.telegram} target="_blank" to="https://t.me/+TyHdG_WXJmViZDVi">
                Telegram
              </Link>
              .
            </p>
            <ModalFooter
              close={closeModal}
              action={{ label: 'Send feedback', onClick: onSubmit }}
            />
          </div>
        </BaseModal>
      )}
    </>
  );
};
