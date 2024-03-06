import cn from './Result.module.css';

// TODO Move to utils
const getFormattedJSON = (json: string) => JSON.stringify(json, null, 2);

export const Result = ({ result }: any) => {
  return (
    <div className={cn.result}>
      <h3>Result:</h3>
      {/*  @ts-ignore */}
      <pre style={{ textWrap: 'wrap' }}>{getFormattedJSON(result)}</pre>
    </div>
  );
};
