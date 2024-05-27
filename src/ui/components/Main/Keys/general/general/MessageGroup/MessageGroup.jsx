import cn from './MessageGroup.module.css';
import { Link, useParams } from 'react-router-dom';

export const MessageGroup = ({ errors, publicKey, dirtyFields }) => {
  const params = useParams();
  return (
    <div className={cn.message}>
      {!errors && publicKey && !dirtyFields && (
        <div>
          <p className={cn.subtitle}>{publicKey} was successfully imported</p>
          <p className={cn.note}>
            Note: Currently you need to add related accounts manually on the{' '}
            <Link className={cn.link} to={`/${params.currentNetworkId}/accounts`}>
              Accounts
            </Link>{' '}
            page
          </p>
        </div>
      )}
    </div>
  );
};
