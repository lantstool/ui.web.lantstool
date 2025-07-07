import { CopyButton } from '@gc/CopyButton/CopyButton.jsx';
import { FunctionCall } from './FunctionCall/FunctionCall.jsx';
import { Tooltip } from '@gc/Tooltip/Tooltip.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import cn from './Item.module.scss';

export const Item = ({ value, type }) => {
  const navigate = useNavigate();
  const { spaceId, networkId } = useParams();

  const redirectExistKey = () => {
    if (!value.isLocalExists) return;
    navigate(`/space/${spaceId}/near-protocol/${networkId}/keys/${value.publicKey}`);
  };

  return (
    <div className={value.isLocalExists ? cn.itemPointer : cn.item} onClick={redirectExistKey}>
      <div className={cn.wrapper}>
        <p className={cn.subtitle}>{value.publicKey}</p>
        <div className={cn.buttonWrapper}>
          {value.isLocalExists && (
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
            <CopyButton event="onClick" value={value.publicKey} />
          </div>
        </div>
      </div>
      {type === 'functionCall' && <FunctionCall functionKey={value} />}
    </div>
  );
};
