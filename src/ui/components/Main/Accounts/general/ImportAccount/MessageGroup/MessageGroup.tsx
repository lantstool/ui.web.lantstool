import cn from './MessageGroup.module.css';
import { Link, useParams } from 'react-router-dom';

export const MessageGroup = ({ errors, accountId, dirtyFields }: any) => {
  const params = useParams();

  return (
    <div className={cn.message}>
      {!errors && accountId && !dirtyFields && (
        <div>
          <p className={cn.subtitle}>{accountId}</p>
          <p className={cn.subtitle}> was successfully imported</p>
          <p className={cn.note}>
            Note: To sign transactions, manually import the required account keys on the{' '}
            <Link className={cn.link} to={`/${params.currentNetworkId}/keys`}>
              Keys
            </Link>{' '}
            page
          </p>
        </div>
      )}
    </div>
  );
};
