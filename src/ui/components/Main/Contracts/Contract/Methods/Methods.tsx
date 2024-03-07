import { useMemo, useState } from 'react';
import cn from './Methods.module.css';
import { Button } from '../../../general/Button/Button.tsx';
import { Form } from './Form/Form.tsx';

const getModeType = (change: any, view: any, edit: any) => ({
  isEditMode: edit,
  isEmptyEditMode: (change.length > 0 || view.length > 0) && !edit,
  isEmpty: change.length === 0 && view.length === 0 && !edit,
});

export const Methods = ({ contract, contractId }) => {
  const [edit, setEdit] = useState(false);

  const { view, change } = contract.methods;

  const { isEditMode, isEmpty, isEmptyEditMode }: any = useMemo(
    () => getModeType(change, view, edit),
    [change, view, edit],
  );

  const openEdit = () => setEdit(true);

  return (
    <div className={cn.methods}>
      {isEmpty ? (
        <div className={cn.addWrapper}>
          <h4>This contract doesn’t have any methods. Please add one to start using it</h4>
          <Button text="Add Methods" style="secondary" onClick={openEdit} />
        </div>
      ) : (
        <Form
          edit={edit}
          isEmptyEditMode={isEmptyEditMode}
          isEditMode={isEditMode}
          setEdit={setEdit}
          contractId={contractId}
          contract={contract}
          openEdit={openEdit}
        />
      )}
    </div>
  );
};
