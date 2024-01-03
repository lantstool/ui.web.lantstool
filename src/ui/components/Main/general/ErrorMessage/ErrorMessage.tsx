import cn from './ErrorMessage.module.css';

export const ErrorMessage = ({ error }: any) => <p className={cn.error}>{error}</p>;
