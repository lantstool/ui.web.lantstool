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
        <h3 className={cn.title}>Result:</h3>
        {!result ? (
          '...Loading'
        ) : (
          <>
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
