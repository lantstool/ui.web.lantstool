import { useParams } from 'react-router-dom';
import { useStoreEffect, useStoreState } from '../../../../../../../../react-vault/index.js';
import { Transaction } from './Transaction/Transaction.jsx';
import { CreateTransaction } from '../_general/CreateTransaction/CreateTransaction.jsx';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import cn from './List.module.scss';

export const List = ({ txList }) => {
  const { transactionId } = useParams();
  const txMap = useStoreState((store) => store.nearProtocol.transactions.txMap);
  const reorder = useStoreEffect((store) => store.nearProtocol.transactions.reorder);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    reorder({
      source: result.source.index,
      destination: result.destination.index,
    });
  };

  return (
    <div className={cn.transactionList}>
      <div className={cn.topBar}>
        <h2 className={cn.title}>Transactions</h2>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="transactions">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className={cn.wrapper}>
              {txList.map((txId, index) => (
                <Transaction
                  index={index}
                  key={txId}
                  transaction={txMap[txId]}
                  isActive={txId === transactionId}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className={cn.bottomBar}>
        <CreateTransaction styles={cn.modalContainer} />
      </div>
    </div>
  );
};
