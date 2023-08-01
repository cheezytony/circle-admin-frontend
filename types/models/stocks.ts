import { Model, User } from '.';

export interface Account extends Model {
  id: string;
  user_id: string;
  provider_id: string;
  number: string;
  portfolio_id?: string;
  type: AccountType;
  management_type: AccountManagementType;
  trading_type: AccountTradingType;
  status: AccountStatus;

  trader: Trader;
  orders: StockOrder[];
}

export enum AccountType {
  LIVE = 'LIVE',
}

export enum AccountManagementType {
  SELF = 'SELF',
  RIA_MANAGED = 'RIA_MANAGED',
  // ADVISORY
  // CUSTODIAL
  // CUSTODIAL_MANAGED
  // RESERVED
}

export enum AccountTradingType {
  CASH = 'CASH',
  MARGIN = 'MARGIN',
  CRYPTO = 'CRYPTO',
}

export enum AccountStatus {
  PENDING = 'PENDING',
  OPEN = 'OPEN',
  OPEN_NO_NEW_TRADES = 'OPEN_NO_NEW_TRADES',
  CLOSED = 'CLOSED',
}

export interface Trader extends Model {
  id: string;
  user_id: string;
  provider_id: string;
  status: TraderStatus;

  accounts: Account[];
}

export enum TraderStatus {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface StockOrder extends Model {
  id: string;
  provider_id: string;
  provider_order_no: string;
  user_id: string;
  account_id: string;
  reference?: string;
  subscription_product_id?: string;
  payment_id?: string;
  symbol: string;
  amount: number;
  side: StockOrderSide;
  type: StockOrderType;
  status: StockOrderStatus;

  account: Account;
  instrument: StockInstrument;
  user?: User;
}

export enum StockOrderSide {
  BUY = 'BUY',
  SELL = 'SELL',
}

export enum StockOrderType {
  MARKET = 'MARKET',
  STOP = 'STOP',
  LIMIT = 'LIMIT',
  MARKET_IF_TOUCHED = 'MARKET_IF_TOUCHED',
}

export enum StockOrderStatus {
  PENDING = 'PENDING',
  CANCELED = 'CANCELED',
  FAILED = 'FAILED',
  FULFILLED = 'FULFILLED',
  COMPLETED = 'COMPLETED',
}

export interface StockInstrument extends Model {
  provider_id: string;
  symbol: string;
  name: string;
  sector?: string;
  image?: string;
  change?: number;
  absolute_change?: number;
  trade_count?: number;
  status: StockInstrumentStatus;
  type: StockInstrumentType;
  data?: object;
  quote?: object;
  data_updated_at?: Date;
  quote_updated_at?: Date;

  orders: StockOrder[];
}

enum StockInstrumentStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  CLOSE_ONLY = 'CLOSE_ONLY',
  HALTED = 'HALTED',
}

enum StockInstrumentType {
  EQUITY = 'EQUITY',
  ETF = 'ETF',
  ADR = 'ADR',
  ETN = 'ETN',
  ALTERNATIVE_ASSET = 'ALTERNATIVE_ASSET',
  CRYPTO = 'CRYPTO',
}
