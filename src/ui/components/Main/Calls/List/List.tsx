import { useParams } from 'react-router-dom';
import { useStoreEffect, useStoreState } from '../../../../../react-vault';
import { Item } from './Item/Item.tsx';
import cn from './List.module.css';
import { CreateCall } from '../general/CreateCall/CreateCall.tsx';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';

export const List = ({ ids }: any) => {
  const records: any = useStoreState((store: any) => store.calls.records);
  const reorderCalls = useStoreEffect((store: any) => store.calls.reorderCalls);
  const params = useParams();

  const onDragEnd = (result: any) => {
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
          {(provided: any) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className={cn.wrapper}>
              {ids.map((callId: any, index: number) => (
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
