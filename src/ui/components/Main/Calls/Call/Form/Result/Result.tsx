import cn from './Result.module.css';

export const Result = ({ result }: any) => {

  console.log(result);
  return (
    <div className={cn.call}>
      <p>Result</p>
    </div>
  );
};
