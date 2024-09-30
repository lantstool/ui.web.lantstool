import { NavLink } from 'react-router-dom';
import cnm from 'classnames';
import cn from './Transaction.module.scss';
import { Draggable } from '@hello-pangea/dnd';

export const Transaction = ({ index, transaction, isActive }) => (
  <Draggable draggableId={transaction.transactionId} index={index}>
    {(provided) => (
      <div
        className={cn.container}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <NavLink to={transaction.transactionId} className={cnm(cn.wrapper, isActive && cn.active)}>
          <p className={cn.title}>{transaction.name}</p>
        </NavLink>
      </div>
    )}
  </Draggable>
);
