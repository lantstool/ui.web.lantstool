import { GeneralModal } from './GeneralModal/GeneralModal.jsx';
import { getAvailablePredefinedRpcs } from './getAvailablePredefinedRpcs.js';
import { ManualModal } from './ManualModal/ManualModal.jsx';

export const Modal = ({ network, close }) => {
  const { hasAvailablePredefinedRpcs, availablePredefinedRpcs } =
    getAvailablePredefinedRpcs(network);

  return hasAvailablePredefinedRpcs ? (
    <GeneralModal
      network={network}
      close={close}
      availablePredefinedRpcs={availablePredefinedRpcs}
    />
  ) : (
    <ManualModal network={network} close={close} />
  );
};
