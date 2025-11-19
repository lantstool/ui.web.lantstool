import { effect } from '@react-vault';

export const sendFeedback = effect(async ({ store, payload }) => {
  const setNotification = store.getActions((store) => store.setNotification);
  const { name, email, feedbackType, message, closeModal } = payload;

  try {
    const response = await fetch('http://localhost:3000/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        feedbackType: feedbackType.value,
        message,
      }),
    });

    if (!response.ok) {
      throw new Error('Feedback failed');
    }

    closeModal(true);
    setNotification({ isOpen: true, message: 'Feedback sent', variant: 'success' });
  } catch (e) {
    const errorMessage = e ? e.message : 'Feedback failed';
    console.log(e);
    closeModal(true);
    setNotification({ isOpen: true, message: errorMessage, variant: 'error' });
  }
});
