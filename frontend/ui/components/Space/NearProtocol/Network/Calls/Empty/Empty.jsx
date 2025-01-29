import { useToggler } from '@hooks/useToggler.js';
import { useStoreEffect } from '@react-vault';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../../../../_general/Button/Button.jsx';
import { ImportModal } from '../../_general/ImportModal/ImportModal.jsx';
import { callImportSchema } from '../_general/validations/callImportSchema.js';
import cn from './Empty.module.scss';

export const Empty = () => {
  const { spaceId, networkId } = useParams();
  const [isImportOpen, openImport, closeImport] = useToggler(false);
  const createOne = useStoreEffect((store) => store.nearProtocol.calls.createOne);
  const importOneFromJson = useStoreEffect((store) => store.nearProtocol.calls.importOneFromJson);
  const importOneFromFile = useStoreEffect((store) => store.nearProtocol.calls.importOneFromFile);
  const navigate = useNavigate();

  const create = () => createOne({ spaceId, networkId, navigate });

  return (
    <>
      <div className={cn.empty}>
        <span className={cn.callsIcon} />
        <h2 className={cn.title}>
          Looks like you need to add something here.
          <br /> Get a move on.
        </h2>
        <div className={cn.btnWrapper}>
          <Button
            onClick={openImport}
            color="secondary"
            type="button"
            iconLeftStyles={cn.importIcon}
          >
            Import Call
          </Button>
          <Button onClick={create} type="button">
            Create Call
          </Button>
        </div>
      </div>
      {isImportOpen && (
        <ImportModal
          closeModal={closeImport}
          yupSchema={callImportSchema}
          importOneFromJson={importOneFromJson}
          importOneFromFile={importOneFromFile}
          entityName="Call"
        />
      )}
    </>
  );
};
