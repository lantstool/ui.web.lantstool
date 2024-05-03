import { useParams } from 'react-router-dom';
import { useStoreEffect, useStoreState } from '../../../../../react-vault';
import { Item } from './Item/Item.jsx';
import cn from './List.module.css';
import { CreateCall } from '../general/CreateCall/CreateCall.jsx';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';

export const List = ({ ids }) => {
  const records = useStoreState((store) => store.calls.records);
  const reorderCalls = useStoreEffect((store) => store.calls.reorderCalls);
  const params = useParams();

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const currentOrder = result.source.index;
    const newOrder = result.destination.index;
    reorderCalls({ currentOrder, newOrder });
  };

  return (
    <div className={cn.container}>
      <div className={cn.topBar}>
        <h2 className={cn.title}>Calls</h2>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="calls">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className={cn.wrapper}>
              {ids.map((callId, index) => (
                <Item
                  key={callId}
                  isActive={callId === params?.callId}
                  callId={callId}
                  name={records[callId].name}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className={cn.bottomBar}>
        <CreateCall styles={cn.modalContainer} />
      </div>
    </div>
  );
};
