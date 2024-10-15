import { NavLink } from 'react-router-dom';
import cnm from 'classnames';
import cn from './Item.module.scss';
import { Draggable } from '@hello-pangea/dnd';

export const Item = ({ callId, name, index, isActive }) => (
  <Draggable key={callId} draggableId={callId} index={index}>
    {(provided) => (
      <div
        className={cn.container}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <NavLink to={`${callId}`} className={cnm(cn.wrapper, isActive && cn.active)}>
          <p className={cn.title}>{name}</p>
        </NavLink>
      </div>
    )}
  </Draggable>
);
