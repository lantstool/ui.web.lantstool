import { ChangesInBlock } from './ChangesInBlock.tsx';
import { ChunkDetails } from './ChunkDetails/ChunkDetails.tsx';

export const ChunkForms = ({ call }: any) => (
  <>
    {call.type === 'EXPERIMENTAL_changes_in_block' && <ChangesInBlock call={call} />}
    {call.type === 'chunk' && <ChunkDetails call={call} />}
  </>
);
