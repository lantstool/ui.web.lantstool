import { effect } from '@react-vault';

const errorMessages = {
  TOO_MANY_REQUESTS:
    'You have sent too many feedback requests. Please wait a minute and try again.',
  BAD_REQUEST: 'Server error. Your feedback was not saved. Please try again.',
  NETWORK_ERROR:
    'Network error. The server is not responding. Please check your connection or try again later.',
};

const getErrorMessageFromStatus = (status) => {
  const errorCods = {
    429: errorMessages.TOO_MANY_REQUESTS,
    400: errorMessages.BAD_REQUEST,
  };

  return errorCods[status] ?? errorMessages.NETWORK_ERROR;
};

export const sendFeedback = effect(async ({ store, payload }) => {
  const setNotification = store.getActions((store) => store.setNotification);
  const { formValues, closeModal } = payload;
  const { name, contactMethod, contactInfo, feedbackType, message } = formValues;

  closeModal(true);
  try {
    //TODO: change to normal URL
    const response = await fetch('https://perceptive-intuition-lantstoolapitest.up.railway.app/feedback', {
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
      const errorMessage = getErrorMessageFromStatus(response.status);
      setNotification({ isOpen: true, message: errorMessage, variant: 'error', delay: 5000 });
      return;
    }

    setNotification({ isOpen: true, message: 'Feedback sent', variant: 'success' });
  } catch (e) {
    console.log(e);
    closeModal(true);
    setNotification({
      isOpen: true,
      message: errorMessages.NETWORK_ERROR,
      variant: 'error',
      delay: 5000,
    });
  }
});
