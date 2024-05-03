import { ChangesInBlock } from './ChangesInBlock.jsx';
import { ChunkDetails } from './ChunkDetails/ChunkDetails.jsx';

export const ChunkForms = ({ call }) => (
  <>
    {call.type === 'EXPERIMENTAL_changes_in_block' && <ChangesInBlock call={call} />}
    {call.type === 'chunk' && <ChunkDetails call={call} />}
  </>
);
