import { useParams } from 'react-router-dom';
import { useStoreEffect } from '../../../../../../../../react-vault/index.js';
import { Item } from './Item/Item.jsx';
import cn from './List.module.scss';
import { CreateCall } from '../_general/CreateCall/CreateCall.jsx';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';

export const List = ({ list }) => {
  const reorder = useStoreEffect((store) => store.nearProtocol.calls.reorder);
  const params = useParams();

  const onDragEnd = (result) => {
    if (!result.destination) return;
    reorder({
      source: result.source.index,
      destination: result.destination.index,
    });
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
              {list.map((call, index) => (
                <Item
                  key={call.callId}
                  isActive={call.callId === params?.callId}
                  call={call}
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
