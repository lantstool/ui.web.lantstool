import { DeleteModal as Modal } from '@gc/modals/DeleteModal/DeleteModal.jsx';
import cn from './DeleteModal.module.scss';

export const DeleteModal = ({ closeModal, item, text, remove }) => (
  <Modal
    close={closeModal}
    submit={remove}
    text={{
      title: (
        <>
          Delete <span className={cn.deleteText}>{item.name}?</span>
        </>
      ),
      description: `
          Are you sure you want to delete this ${text}? 
          This action will permanently remove it. 
          Be sure to export any important data before proceeding.
        `,
      submitButtonText: 'Delete',
    }}
  />
);
