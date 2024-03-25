import cn from './Result.module.css';
import { Button } from '../../../../general/Button/Button.tsx';

// TODO Move to utils
const getFormattedJSON = (json: string) => JSON.stringify(json, null, 2);

export const Result = ({ result, setResult, setOpen }: any) => {
  const closeResult = () => {
    setResult('');
    setOpen(false);
  };

  return (
    <div>
      <div className={cn.container}>
        {!result ? (
          'Loading...'
        ) : (
          <>
            <h3>Result</h3>
            {/*  @ts-ignore */}
            <pre className={cn.subtitle} style={{ textWrap: 'wrap' }}>
              {getFormattedJSON(result.status)}
            </pre>
            <h3>ID</h3>
            <p>{result?.transaction_outcome?.id}</p>
            <h3>Details</h3>
            {/*  @ts-ignore */}
            <pre className={cn.subtitle} style={{ textWrap: 'wrap' }}>
              {getFormattedJSON(result)}
            </pre>
          </>
        )}
      </div>
      <div className={cn.footer}>
        <Button onClick={closeResult} text={'Close'} style="outlined" />
      </div>
    </div>
  );
};
