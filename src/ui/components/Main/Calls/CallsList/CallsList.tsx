import { useParams } from 'react-router-dom';
import { useStoreEffect, useStoreState } from '../../../../../react-vault';
import { CallItem } from './CallItem/CallItem.tsx';
import cn from './CallsList.module.css';
import { CreateCall } from '../general/CreateCall/CreateCall.tsx';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

export const CallsList = () => {
  const list: any = useStoreState((store: any) => store.calls.list);
  const map: any = useStoreState((store: any) => store.calls.map);
  const onReorderTransactions = useStoreEffect(
    (store: any) => store.transactions.onReorderTransactions,
  );
  const params = useParams();

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const currentOrder = result.source.index;
    const newOrder = result.destination.index;
    onReorderTransactions({ currentOrder, newOrder });
  };

  return (
    <div className={cn.container}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="calls">
          {(provided: any) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className={cn.wrapper}>
              {list.map((callId: any, index: number) => (
                <Draggable key={callId} draggableId={callId} index={index}>
                  {(provided: any) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <CallItem
                        key={callId}
                        call={map[callId]}
                        isActive={callId === params?.callId}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <CreateCall styles={cn.modalContainer} />
    </div>
  );
};
