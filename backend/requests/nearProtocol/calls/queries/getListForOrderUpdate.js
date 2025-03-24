/**
  We need to update the order of all calls which have order > than the added one
  because we need to have a subsequent unique order of calls
  like 0, 1, 2, 3, 4, 5, not 0, 1, 3, 5
  because we use calls count as a call order for the new call
  Example: we have 6 calls, and we delete the 3rd one -
  we need to update the order of the 4th, 5th and 6th
*/

export const getListForOrderUpdate = `
  SELECT callId, name, "order"
  FROM near_protocol_calls
  WHERE spaceId = @spaceId
    AND networkId = @networkId
    AND "order" > (
      SELECT "order"
      FROM near_protocol_calls
      WHERE callId = @callId
    )
  ORDER BY "order"
`;
