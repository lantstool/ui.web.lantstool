import { Link } from 'react-router-dom';
import cn from './GetStarted.module.scss';

export const GetStarted = () => {
  return (
    <div className={cn.container}>
      <h1>Get Started</h1>
      <Link to="/spaces/create">Create Space</Link>
    </div>
  );
};
