import cn from './Tooltip.module.scss';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

//We define height and width in style
//because the arrow is not displayed when width < 26px and height < 24

export const Tooltip = ({
  color = 'black',
  content,
  placement = 'bottom-start',
  children,
  style,
}) => {
  return (
    <>
      <Tippy
        sho
        className={color === 'black' ? cn.tooltipBlack : cn.tooltipWhite}
        content={content}
        placement={placement}
      >
        <div className={style}>{children}</div>
      </Tippy>
    </>
  );
};
