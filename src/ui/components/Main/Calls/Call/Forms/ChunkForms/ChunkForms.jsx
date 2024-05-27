import { ChangesInBlock } from './ChangesInBlock.jsx';
import { ChunkDetails } from './ChunkDetails/ChunkDetails.jsx';

export const ChunkForms = ({ form, type }) => (
  <>
    {type === 'EXPERIMENTAL_changes_in_block' && <ChangesInBlock form={form} />}
    {type === 'chunk' && <ChunkDetails form={form} />}
  </>
);
