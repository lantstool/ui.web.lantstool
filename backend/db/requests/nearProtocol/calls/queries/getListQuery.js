// We use it to get a calls list
export const getListQuery = (spaceId, networkId) => `
  SELECT callId, name, "order" FROM near_protocol_calls
  WHERE spaceId = '${spaceId}' AND networkId = '${networkId}'
  ORDER BY "order";
`;
