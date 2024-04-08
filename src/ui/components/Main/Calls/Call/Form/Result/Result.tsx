import cn from './Result.module.css';

// TODO Move to utils

export const Result = ({ result }: any) => (
  <div className={cn.result}>
    <h3>Result:</h3>
    <p className={cn.text}>{result}</p>
  </div>
);
