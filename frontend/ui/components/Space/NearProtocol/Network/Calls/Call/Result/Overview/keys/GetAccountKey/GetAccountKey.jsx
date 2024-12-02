import { KeyCard } from '../../_general/KeyCard/KeyCard.jsx';

export const GetAccountKey = ({ result, formValues }) => (
  <KeyCard
    result={result}
    accountId={formValues.accountId.value}
    publicKey={formValues.publicKey.value}
  />
);
