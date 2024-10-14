import { Link } from 'react-router-dom';
import cn from './MessageGroup.module.scss';

export const MessageGroup = ({ errors, accountId, dirtyFields }) => {
  return (
    <div className={cn.message}>
      {!errors && accountId && !dirtyFields && (
        <div>
          <p className={cn.subtitle}>{accountId}</p>
          <p className={cn.subtitle}> was successfully imported</p>
          <p className={cn.note}>
            Note: To sign transactions, manually import the required account keys on the{' '}
            <Link className={cn.link} to={`../keys`} relative="path">
              Keys
            </Link>{' '}
            page
          </p>
        </div>
      )}
    </div>
  );
};
