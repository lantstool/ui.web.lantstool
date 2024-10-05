import cn from './IconGroup.module.scss';

export const IconGroup = ({ src, text, styles, comingSoon = false, selectStep }) => {
  return (
    <div className={styles} onClick={selectStep}>
      <img className={cn.img} src={src} alt="#" />
      {comingSoon && (
        <div className={cn.wrapper}>
          <p className={cn.title}>Coming soon</p>
        </div>
      )}
      <p className={cn.subtitle}>{text}</p>
    </div>
  );
};
