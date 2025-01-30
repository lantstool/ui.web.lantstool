import { useToggler } from '@hooks/useToggler.js';
import { useNavigate, useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import { ImportModal } from '../../_general/ImportModal/ImportModal.jsx';
import { transactionConfig } from '../_general/transactionConfig.js';
import { transactionImportSchema } from '../_general/transactionImportSchema/transactionImportSchema.js';
import { Transaction } from './Transaction/Transaction.jsx';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { Tooltip } from '../../../../../_general/Tooltip/Tooltip.jsx';
import cn from './List.module.scss';

export const List = ({ txList }) => {
  const params = useParams();
  const { spaceId, networkId } = useParams();
  const navigate = useNavigate();
  const reorder = useStoreEffect((store) => store.nearProtocol.transactions.reorder);
  const create = useStoreEffect((store) => store.nearProtocol.transactions.create);
  const importOneFromJson = useStoreEffect(
    (store) => store.nearProtocol.transactions.importOneFromJson,
  );
  const importOneFromFile = useStoreEffect(
    (store) => store.nearProtocol.transactions.importOneFromFile,
  );
  const [isImportOpen, openImport, closeImport] = useToggler(false);

  const withTxConfig = (fn) => (args) => fn({ ...args, transactionConfig });

  const onDragEnd = (result) => {
    if (!result.destination) return;
    reorder({
      source: result.source.index,
      destination: result.destination.index,
    });
  };

  const onSubmit = () => {
    create({ spaceId, networkId, navigate });
  };

  return (
    <>
      <div className={cn.list}>
        <div className={cn.topBar}>
          <button className={cn.createBtn} onClick={onSubmit}>
            <span className={cn.addIcon} />
            <h2 className={cn.title}>Create Transaction</h2>
          </button>
          <Tooltip style={cn.tooltip} arrow={false} content="Import transaction" placement="top">
            <button className={cn.importBtn} onClick={openImport}>
              <span className={cn.importIcon} />
            </button>
          </Tooltip>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="transactions">
            {(provided) => (
              <div className={cn.scrollBar}>
                <div {...provided.droppableProps} ref={provided.innerRef} className={cn.wrapper}>
                  {txList.map((tx, index) => (
                    <Transaction
                      index={index}
                      key={tx.transactionId}
                      transaction={tx}
                      isActive={tx.transactionId === params?.transactionId}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      {isImportOpen && (
        <ImportModal
          closeModal={closeImport}
          yupSchema={transactionImportSchema}
          importOneFromJson={withTxConfig(importOneFromJson)}
          importOneFromFile={withTxConfig(importOneFromFile)}
          entityName="Transaction"
        />
      )}
    </>
  );
};
