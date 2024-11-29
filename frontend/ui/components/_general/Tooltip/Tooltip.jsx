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
}) => {
  return (
    <>
      <Tippy
        arrow={arrow}
        className={color === 'black' ? cn.tooltipBlack : cn.tooltipWhite}
        content={content}
        placement={placement}
        duration={20}
      >
        <div className={style}>{children}</div>
      </Tippy>
    </>
  );
};
