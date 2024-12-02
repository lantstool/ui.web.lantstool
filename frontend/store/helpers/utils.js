import { utils } from 'near-api-js';

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getFormattedJSON = (json) => JSON.stringify(json, null, 2);

export const formatNumber = (number) => {
  const formatNearAmount = utils.format.formatNearAmount(number);
  return formatNearAmount.toString().replace(/(\.\d{5})\d*$/, '$1');
};
