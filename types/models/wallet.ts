import { Currency } from '../misc';
import { Model, User } from '.';

export interface Wallet extends Model {
  user_id: string;
  currency: Currency;
  balance: number;
  ledger_balance: number;
  last_transaction_id: string;
  user?: User;
}

export interface WalletTransaction extends Model {
  user_id: string;
  wallet_id: string;
  parent_reference?: string;
  reference: string;
  balance: number;
  amount: number;
  fee: number;
  currency: Currency;
  status: WalletTransactionStatus;
  type: WalletTransactionType;
  source?: string;
  event: string; // TODO: Add event type and event id,
  event_id: string;
  description?: string;
  meta?: object;

  user?: User;
  wallet?: Wallet;
}

export enum WalletTransactionStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  FAILED = 'FAILED',
}

export enum WalletTransactionType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
}
