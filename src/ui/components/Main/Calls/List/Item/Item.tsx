import { NavLink } from 'react-router-dom';
import cnm from 'classnames';
import cn from './Item.module.css';
import { Draggable } from '@hello-pangea/dnd';

export const Item = ({ callId, name, index, isActive }: any) => (
  <Draggable key={callId} draggableId={callId} index={index}>
    {(provided: any) => (
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
