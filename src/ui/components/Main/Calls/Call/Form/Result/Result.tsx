import cn from './Result.module.css';

// TODO Move to utils
const getFormattedJSON = (json: string) => {
  const parsedJson = JSON.parse(json);
  return JSON.stringify(parsedJson, null, 2);
}

export const Result = ({ result }: any) => {
  return (
    <div className={cn.result}>
      <h3>Result:</h3>
      <pre>{getFormattedJSON(result)}</pre>
    </div>
  );
};
