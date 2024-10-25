import { CopyButton } from '../../../../../../../_general/CopyButton/CopyButton.jsx';
import { CheckCircleBold } from '../../../../../../../_general/icons/CheckCircleBold.jsx';
import { FunctionCall } from './FunctionCall/FunctionCall.jsx';
import { Tooltip } from '../../../../../../../_general/Tooltip/Tooltip.jsx';
import cn from './Items.module.scss';

export const Items = ({ keys, type, name }) => {
  if (keys.length === 0) return;

  return (
    <div className={cn.container}>
      <h2 className={cn.title}>{name}</h2>
      {keys.map((key) => (
        <div key={key.publicKey} className={cn.item}>
          <div className={cn.wrapper}>
            <p className={cn.subtitle}>{key.publicKey}</p>
            <div className={cn.buttonWrapper}>
              {key.isLocalExists && (
                <Tooltip placement="top" color="black" content="Imported to Lantstool">
                  <CheckCircleBold style={cn.icon} />
                </Tooltip>
              )}
              <CopyButton event="onClick" type="small" value={key.publicKey} />
            </div>
          </div>
          {type === 'functionCall' && <FunctionCall functionKey={key} />}
        </div>
      ))}
    </div>
  );
};
