import { onAddTransaction } from './onAddTransaction.ts';
import { onSendTransaction } from "./onSendTransaction.ts";
import { onInitPage } from "./onInitPage.ts";

export const effects = {
  onAddTransaction,
  onSendTransaction,
  onInitPage,
};
