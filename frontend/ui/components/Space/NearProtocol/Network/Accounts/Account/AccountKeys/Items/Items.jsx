import { CopyButton } from '@gc/CopyButton/CopyButton.jsx';
import { FunctionCall } from './FunctionCall/FunctionCall.jsx';
import { Tooltip } from '@gc/Tooltip/Tooltip.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import cn from './Items.module.scss';

export const Items = ({ keys, type, name }) => {
  if (keys.length === 0) return;
  const navigate = useNavigate();
  const { spaceId, networkId } = useParams();

  const redirectExistKeys = (key) => {
    if (key.isLocalExists) {
      navigate(`/space/${spaceId}/near-protocol/${networkId}/keys/${key.publicKey}`);
    }
  };

  return (
    <div className={cn.container}>
      <h2 className={cn.title}>{name}</h2>
      {keys.map((key) => (
        <div
          key={key.publicKey}
          className={key.isLocalExists ? cn.itemPointer : cn.item}
          onClick={() => redirectExistKeys(key)}
        >
          <div className={cn.wrapper}>
            <p className={cn.subtitle}>{key.publicKey}</p>
            <div className={cn.buttonWrapper}>
              {key.isLocalExists && (
                <Tooltip
                  style={cn.tooltip}
                  placement="top"
                  color="black"
                  content="Imported to Lantstool"
                >
                  <span className={cn.icon} />
                </Tooltip>
              )}
              <div className={cn.copy}>
                <CopyButton event="onClick" value={key.publicKey} />
              </div>
            </div>
          </div>
          {type === 'functionCall' && <FunctionCall functionKey={key} />}
        </div>
      ))}
    </div>
  );
};
