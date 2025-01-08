import { object, string } from 'yup';

export const blockTargetSchema = object({
  finality: string().oneOf(['final', 'near-final', 'optimistic']).nullable(),
  blockId: string().nullable(),
})
  .test('one-required', 'Exactly one of "finality" or "blockId" must be present', (value) => {
    const { finality, blockId } = value || {};
    const hasFinality = typeof finality === 'string';
    const hasBlockId = typeof blockId === 'string';
    return (hasFinality && !hasBlockId) || (!hasFinality && hasBlockId);
  })
  .required('Params are required');
