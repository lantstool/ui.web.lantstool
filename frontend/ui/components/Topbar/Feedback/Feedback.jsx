import { Button } from '@gc/Button/Button.jsx';
import { FormDropdown } from '@gc/dropdown/FormDropdown.jsx';
import { FormInput } from '@gc/input/FormInput/FormInput.jsx';
import { useState } from 'react';
import { BaseModal } from '@gc/modals/BaseModal/BaseModal.jsx';
import { ModalFooter } from '@gc/modals/ModalFooter/ModalFooter.jsx';
import { ModalHeader } from '@gc/modals/ModalHeader/ModalHeader.jsx';
import { FormTextarea } from '@gc/FormTextarea/FormTextarea.jsx';
import { useForm, useWatch } from 'react-hook-form';
import { schema } from './schema.js';
import { zodResolver } from '@hookform/resolvers/zod';
import { useStoreEffect } from '@react-vault';
import { contactOptions, feedbackOptions } from './dropdownOptions.js';
import cn from './Feedback.module.scss';

const contactInfoPlaceholders = {
  Email: 'email@example.com',
  Telegram: '@username',
  Discord: 'username#1234',
};

const getContactInfoPlaceholder = (contractMethod) =>
  contactInfoPlaceholders[contractMethod]
    ? contactInfoPlaceholders[contractMethod]
    : contactInfoPlaceholders['Email'];

export const Feedback = () => {
  const [open, setOpen] = useState(false);
  const sendFeedback = useStoreEffect((store) => store.spaces.sendFeedback);

  const form = useForm({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      contactMethod: {
        label: 'Email',
        value: 'Email',
      },
      contactInfo: '',
      feedbackType: {
        label: 'Ask a question',
        value: 'AskQuestion',
      },
      message: '',
    },
  });

  const {
    control,
    reset,
    trigger,
    formState: { touchedFields },
  } = form;

  const contractMethod = useWatch({ control, name: 'contactMethod.value' });
  const contractInfoPlaceholder = getContactInfoPlaceholder(contractMethod);

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
      <Button
        color="secondary"
        size="small"
        onClick={openModal}
        classes={{ button: cn.feedbackBtn, btnText: cn.btnText }}
      >
        Feedback
      </Button>
      {open && (
        <BaseModal close={closeModal} classes={{ modal: cn.modal }}>
          <ModalHeader
            close={closeModal}
            title="Send your feedback for us"
            classes={{ container: cn.header }}
          />
          <div className={cn.container}>
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
              label={contractMethod}
              placeholder={contractInfoPlaceholder}
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
