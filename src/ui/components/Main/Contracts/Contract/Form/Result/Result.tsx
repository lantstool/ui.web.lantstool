import cn from './Result.module.css';

export const Result = ({ result }: any) => {
  console.log(result);
  return (
    <div className={cn.result}>
      <h3>Result:</h3>
      <p> {result}</p>
    </div>
  );
};
