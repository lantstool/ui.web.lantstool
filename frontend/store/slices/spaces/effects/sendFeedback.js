import { effect } from '@react-vault';

export const sendFeedback = effect(async ({ store, payload }) => {
  const setNotification = store.getActions((store) => store.setNotification);
  const { formValues, closeModal } = payload;
  const { name, contactMethod, contactInfo, feedbackType, message } = formValues;

  closeModal(true);
  try {
    const response = await fetch(import.meta.env.VITE_FEEDBACK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        contactMethod: contactMethod.value,
        contactInfo,
        feedbackType: feedbackType.value,
        message,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      setNotification({ isOpen: true, message: errorData.message, variant: 'error', delay: 5000 });
      return;
    }

    setNotification({ isOpen: true, message: 'Feedback sent', variant: 'success' });
  } catch (e) {
    console.log(e);
    closeModal(true);
    setNotification({
      isOpen: true,
      message:
        'Network error. The server is not responding. Please check your connection or try again later.',
      variant: 'error',
      delay: 5000,
    });
  }
});
