import cn from './ErrorMessage.module.css';

export const ErrorMessage = ({ error }) => <p className={cn.error}>{error}</p>;
