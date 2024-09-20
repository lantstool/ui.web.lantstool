import { useMatch, useNavigate } from 'react-router-dom';

const ChangeSpace = () => {
  const navigate = useNavigate();
  const match = useMatch('/space/:spaceId/*');
  // console.log('ChangeSpace', match);

  if (!match) return null;
  const { spaceId } = match.params;

  const onChange = (event) => {
    navigate(`/space/${event.target.value}`);
  };

  return (
    <select value={spaceId} onChange={onChange}>
      <option value="">Select space</option>
      <option value="personal">Personal</option>
      <option value="shared">Shared</option>
      <option value="public">Public</option>
    </select>
  );
};

const ChangeBlockchain = () => {
  const navigate = useNavigate();
  const match = useMatch('/space/:spaceId/:blockchainId/*');
  // console.log('ChangeBlockchain', match);

  if (!match) return null;

  const { spaceId, blockchainId } = match.params;

  const changeBlockchain = (event) => {
    navigate(`${spaceId}/${event.target.value}`);
  };

  return (
    <select value={blockchainId} onChange={changeBlockchain}>
      <option value="near-protocol">Near Protocol</option>
      <option value="solana">Solana</option>
    </select>
  );
};

const ChangeNearNetwork = () => {
  const navigate = useNavigate();
  const match = useMatch('/space/:spaceId/near-protocol/:networkId/*');
  // console.log('ChangeNearNetwork', match);

  if (!match) return null;

  const { spaceId, networkId } = match.params;

  const onChange = (event) => {
    navigate(`/space/${spaceId}/near-protocol/${event.target.value}`);
  };

  return (
    <select value={networkId} onChange={onChange}>
      <option value="mainnet">Mainnet</option>
      <option value="testnet">Testnet</option>
    </select>
  );
};

const ChangeSolanaNetwork = () => {
  const navigate = useNavigate();
  const match = useMatch('/space/:spaceId/solana/:networkId/*');
  // console.log('ChangeSolanaNetwork', match);

  if (!match) return null;

  const { spaceId, networkId } = match.params;

  const onChange = (event) => {
    navigate(`/space/${spaceId}/solana/${event.target.value}`);
  };

  return (
    <select value={networkId} onChange={onChange}>
      <option value="betanet">betanet</option>
      <option value="localnet">localnet</option>
    </select>
  );
};

export const DropdownRedirect = () => {
  return (
    <div>
      <p>TopBar</p>
      <ChangeSpace/>
      <ChangeBlockchain />
      <ChangeNearNetwork />
      <ChangeSolanaNetwork/>
      <hr />
    </div>
  );
};
