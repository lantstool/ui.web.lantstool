import { Link } from 'react-router-dom';
import cn from './Empty.module.scss';

export const Empty = () => (
  <div className={cn.container}>
    <p>
      There is no networks. Let's create your first one!
      <Link to="create">Create Network</Link>
    </p>
  </div>
);
