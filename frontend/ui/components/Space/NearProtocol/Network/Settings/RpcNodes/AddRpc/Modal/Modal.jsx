import { GeneralModal } from './GeneralModal/GeneralModal.jsx';
import { ManualModal } from './ManualModal/ManualModal.jsx';
import { presets } from '../../../../../../../../../store/slices/nearProtocol/slices/networks/presets.js';

export const Modal = ({ network, close }) => {
  const hasAvailablePredefinedRpcs = true;
  return hasAvailablePredefinedRpcs ? (
    <GeneralModal
      network={network}
      close={close}
      availablePredefinedRpcs={presets.testnet.rpcList}
    />
  ) : (
    <ManualModal network={network} close={close} />
  );
};
