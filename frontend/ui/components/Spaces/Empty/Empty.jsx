import { Link } from 'react-router-dom';
import cn from './Empty.module.scss';

export const Empty = () => (
  <div>
    <p>
      There is no spaces. Let's createSpace your first one! <Link to="create">Create Space</Link>
    </p>
  </div>
);
