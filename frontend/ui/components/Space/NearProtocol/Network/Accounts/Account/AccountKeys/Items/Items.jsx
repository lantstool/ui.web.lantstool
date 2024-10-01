import cn from './Items.module.scss';
import cnm from 'classnames';
import { CheckMarkIcon } from '../../../../../../../../assets/components/CheckMarkIcon.jsx';

export const Items = ({ keys, type, name }) => {
  if (keys.length === 0) return;

  return (
    <div>
      <h2 className={cn.title}>{name}</h2>
      {keys.map((key) => (
        <div
          key={key.publicKey}
          className={cnm(cn.item, type === 'fullAccess' ? cn.fullAccess : cn.functionCall)}
        >
          <div>
            <p className={cn.subtitle}>{key.publicKey}</p>
            {type === 'functionCall' && (
              <p className={cn.contractId}>
                Contract ID: {key.accessKey.permission.functionCall?.receiverId}
              </p>
            )}
          </div>
          {key.isLocalExists && <CheckMarkIcon style={cn.icon} />}
        </div>
      ))}
    </div>
  );
};
