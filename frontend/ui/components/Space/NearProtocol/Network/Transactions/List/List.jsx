import { useParams } from 'react-router-dom';
import { useStoreEffect, useStoreState } from '../../../../../../../../react-vault/index.js';
import { Transaction } from './Transaction/Transaction.jsx';
import cn from './List.module.scss';
import { CreateTransaction } from '../_general/CreateTransaction/CreateTransaction.jsx';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';

export const List = ({ list, map }) => {
  const onReorderTransactions = useStoreEffect(
    (store) => store.nearProtocol.transactions.onReorderTransactions,
  );
  const params = useParams();

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const currentOrder = result.source.index;
    const newOrder = result.destination.index;

    onReorderTransactions({ currentOrder, newOrder });
  };

  return (
    <div className={cn.container}>
      <div className={cn.topBar}>
        <h2 className={cn.title}>Transactions</h2>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="transactions">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className={cn.wrapper}>
              {list.map((id, index) => (
                <Transaction
                  index={index}
                  key={id}
                  transaction={map[id]}
                  isActive={id === params?.transactionId}
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
