import cn from './Card.module.scss';

export const Card = ({ icon, title, description, action }) => {
  return (
    <div className={cn.card}>
      <div className={cn[`${icon}Container`]}>
        <span className={cn[icon]} />
      </div>
      <div className={cn.textWrapper}>
        <h2 className={cn.title}>{title}</h2>
        <p className={cn.description}>{description}</p>
      </div>
      {action}
    </div>
  );
};
