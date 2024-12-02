import { KeyCard } from '../../_general/KeyCard/KeyCard.jsx';

export const GetAccountKey = ({ result, draft }) => (
  <KeyCard result={result} accountId={draft.accountId.value} publicKey={draft.publicKey.value} />
);
