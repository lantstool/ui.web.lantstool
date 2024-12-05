import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import cn from './Tooltip.module.scss';

//We define height and width in style
//because the arrow is not displayed when width < 26px and height < 24

export const Tooltip = ({
  color = 'black',
  content,
  arrow = true,
  placement = 'bottom-start',
  children,
  style,
  duration = 20,
  disabled = false,
  defaultContent = false,
}) => {
  return (
    <>
      <Tippy
        disabled={disabled}
        arrow={arrow}
        className={color === 'black' ? cn.tooltipBlack : cn.tooltipWhite}
        content={content}
        placement={placement}
        duration={duration}
      >
        <div className={style ? style : cn.defaultStyle}>
          {defaultContent && <span className={cn.defaultIcon} />}
          {children}
        </div>
      </Tippy>
    </>
  );
};
