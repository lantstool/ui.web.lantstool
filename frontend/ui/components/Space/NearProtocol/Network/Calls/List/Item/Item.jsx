import { Link } from 'react-router-dom';
import cnm from 'classnames';
import cn from './Item.module.scss';
import { Draggable } from '@hello-pangea/dnd';

export const Item = ({ call, index, isActive }) => (
  <Draggable draggableId={call.callId} index={index}>
    {(provided) => (
      <div
        className={cn.container}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <Link to={`${call.callId}`} className={cnm(cn.wrapper, isActive && cn.active)}>
          <p className={cn.title}>{call.name}</p>
        </Link>
      </div>
    )}
  </Draggable>
);
