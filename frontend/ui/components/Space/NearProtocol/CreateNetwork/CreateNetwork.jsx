import { useLoader } from '@hooks/useLoader.js';
import { useParams } from 'react-router-dom';
import { GeneralPage } from './GeneralPage/GeneralPage.jsx';
import { CreateManually } from './CreateManually/CreateManually.jsx';
import { useStoreEffect, useStoreState } from '@react-vault';
import { presets } from '../../../../../store/slices/nearProtocol/slices/networks/presets.js';

const getAvailablePresets = (ids) => {
  const set = new Set(ids);
  return Object.keys(presets).filter((key) => !set.has(key));
};

export const CreateNetwork = () => {
  const { spaceId } = useParams();
  const getAll = useStoreEffect((store) => store.nearProtocol.networks.getAll);
  const ids = useStoreState((store) => store.nearProtocol.networks.ids);

  const [isLoading] = useLoader(getAll, { spaceId });
  if (isLoading) return null;

  const availablePresets = getAvailablePresets(ids);

  return availablePresets.length > 0 ? (
    <GeneralPage availablePresets={availablePresets} />
  ) : (
    <CreateManually />
  );
};
