import cn from './Key.module.css';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
export const Key = ({ account }: any) => {
  return (
    <div className={cn.container}>
      <div className={cn.keys}>
        <p>Public key: {account.publicKey}</p>
        <p>Seed phrase: {account.seedPhrase}</p>
        <p>Private key: {account.privateKey}</p>
      </div>
      <div className={cn.infoWrapper}>
        <div className={cn.info}>
          <p>Ledger</p>
          <div>
            <p>Full access key</p>
            <div className={cn.infoButtons}>
              <button>
                <ContentCopyIcon />
              </button>
              <button>
                <VisibilityRoundedIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
      <button>
        <HighlightOffOutlinedIcon />
      </button>
    </div>
  );
};
