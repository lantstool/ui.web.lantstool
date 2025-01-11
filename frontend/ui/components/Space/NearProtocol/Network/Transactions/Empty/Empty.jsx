import { useToggler } from '@hooks/useToggler.js';
import { useStoreEffect } from '@react-vault';
import { useParams } from 'react-router-dom';
import { Button } from '../../../../../_general/Button/Button.jsx';
import { useNavigate } from 'react-router-dom';
import { ImportModal } from '../../_general/ImportModal/ImportModal.jsx';
import { transactionImportSchema } from '../_general/transactionImportSchema/transactionImportSchema.js';
import { transactionConfig } from '../_general/transactionConfig.js';
import cn from './Empty.module.scss';

export const Empty = () => {
  const { spaceId, networkId } = useParams();
  const navigate = useNavigate();
  const createTx = useStoreEffect((store) => store.nearProtocol.transactions.create);
  const importOneFromJson = useStoreEffect((store) => store.nearProtocol.transactions.importOneFromJson);
  const importOneFromZip = useStoreEffect((store) => store.nearProtocol.transactions.importOneFromZip);
  const [isImportOpen, openImport, closeImport] = useToggler(false);

  const create = () => {
    createTx({ spaceId, networkId, navigate });
  };

  const withTxConfig = (fn) => (args) => fn({ ...args, transactionConfig });

  return (
    <>
      <div className={cn.empty}>
        <span className={cn.icon} />
        <h2 className={cn.text}>
          Looks like you need to add something here.
          <br />
          Get a move on.
        </h2>
        <div className={cn.btnWrapper}>
          <Button
            onClick={openImport}
            color="secondary"
            type="button"
            iconLeftStyles={cn.importIcon}
          >
            Import Transaction
          </Button>
          <Button onClick={create} type="button">
            Create Transaction
          </Button>
        </div>
      </div>
      {isImportOpen && (
        <ImportModal
          closeModal={closeImport}
          yupSchema={transactionImportSchema}
          importOneFromJson={withTxConfig(importOneFromJson)}
          importOneFromZip={withTxConfig(importOneFromZip)}
          entityName="Transaction"
        />
      )}
    </>
  );
};
