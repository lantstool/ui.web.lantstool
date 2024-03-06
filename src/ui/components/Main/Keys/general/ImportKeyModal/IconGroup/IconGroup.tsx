import cn from './IconGroup.module.css';

export const IconGroup = ({ src, text, styles, comingSoon = false, selectStep }: any) => {
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
