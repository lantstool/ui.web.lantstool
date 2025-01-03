import { useNavigate, useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import { Transaction } from './Transaction/Transaction.jsx';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { Tooltip } from '../../../../../_general/Tooltip/Tooltip.jsx';
import cn from './List.module.scss';

export const List = ({ txList }) => {
  const params = useParams();
  const { spaceId, networkId } = useParams();
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
    <div className={cn.list}>
      <div className={cn.topBar}>
        <button className={cn.createBtn} onClick={onSubmit}>
          <span className={cn.addIcon} />
          <h2 className={cn.title}>New transaction</h2>
        </button>
        <Tooltip style={cn.tooltip} arrow={false} content="Import transaction" placement="bottom">
          <button className={cn.importBtn}>
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
  );
};
