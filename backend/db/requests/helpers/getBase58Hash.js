import bs58 from 'bs58';

export const getBase58Hash = async (arrayBuffer) => {
  // 1. Calculate SHA-256 hash of the buffer
  const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
  // 2. Convert hash buffer to base58
  const hashArray = new Uint8Array(hashBuffer); // Convert buffer to Uint8Array
  return bs58.encode(hashArray); // Return NEAR-compatible hash
};
