import { useNavigate, useParams } from 'react-router-dom';
import { useStoreEffect, useStoreState } from '../../../../../../../../react-vault/index.js';
import { Transaction } from './Transaction/Transaction.jsx';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { AddSquareOutline } from '../../../../../_general/icons/AddSquareOutline.jsx';
import cn from './List.module.scss';

export const List = ({ txList }) => {
  const { spaceId, networkId, transactionId } = useParams();
  const txMap = useStoreState((store) => store.nearProtocol.transactions.txMap);
  const reorder = useStoreEffect((store) => store.nearProtocol.transactions.reorder);
  const create = useStoreEffect((store) => store.nearProtocol.transactions.create);
  const navigate = useNavigate();

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
    <div className={cn.transactionList}>
      <button className={cn.topBar} onClick={onSubmit} type='submit'>
        <AddSquareOutline style={cn.icon}/>
        <h2 className={cn.title}>New transaction</h2>
      </button>
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
    </div>
  );
};
