import { Model, User } from '.';

export interface Subscription extends Model {
  user_id: string;
  plan_id: string;
  amount: number;
  frequency: SubscriptionFrequency;
  beneficiary_count: number;
  start_date?: Date;
  end_date?: Date;
  next_savings_date?: Date;
  auto_save: boolean;
  duration?: number;
  product_allocation: SubscriptionProductAllocation;

  status: SubscriptionStatus;
  plan?: SubscriptionPlan;
  user?: User;
  products?: [
    SubscriptionProduct,
    SubscriptionProduct,
    SubscriptionProduct,
    SubscriptionProduct
  ];
}
export const SubscriptionEx = {} as Subscription;

export interface SubscriptionProductAllocation {
  insurance: number;
  investments: number;
  savings: number;
  stocks: number;
}

export interface SubscriptionPlan extends Model {
  insurance_percentage: number;
  investment_percentage: number;
  investment_product_type: string;
  name: string;
  price: number;
  savings_dollar_percentage: number;
  savings_percentage: number;
  savings_product_type: string;
  stocks_percentage: number;
  stocks_portfolio_id: string;
}
export const SubscriptionPlanEx = {} as SubscriptionPlan;

export enum SubscriptionFrequency {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  BI_ANNUALLY = 'BI_ANNUALLY',
  ANNUALLY = 'ANNUALLY',
}

export enum SubscriptionStatus {
  AWAITING_PAYMENT = 'AWAITING_PAYMENT',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
  TOPPING_UP = 'TOPPING_UP',
}

export type SubscriptionProduct =
  | SubscriptionInsuranceProduct
  | SubscriptionInvestmentProduct
  | SubscriptionSavingsProduct
  | SubscriptionStocksProduct;

export interface SubscriptionInvestmentProduct extends Model {
  config: { type: string; percentage: number };
  percentage: number;
  service: 'INVESTMENT';
  status: ProductStatus;
  subscription_id: string;
  user_id: string;
}

export interface SubscriptionInsuranceProduct extends Model {
  config: { code: string; percentage: number; type: string };
  percentage: number;
  service: 'INSURANCE';
  status: ProductStatus;
  subscription_id: string;
  user_id: string;
}

export interface SubscriptionSavingsProduct extends Model {
  config: [
    {
      percentage: number;
      type: string;
    },
    {
      percentage: number;
      type: string;
    }
  ];
  percentage: number;
  service: 'SAVINGS';
  status: ProductStatus;
  subscription_id: string;
  user_id: string;
}

export interface SubscriptionStocksProduct extends Model {
  config: {
    portfolioId: string;
    riaUserId: string;
  };
  percentage: number;
  service: 'STOCKS';
  status: ProductStatus;
  subscription_id: string;
  user_id: string;
}

export enum ProductStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  LIQUIDATING = 'LIQUIDATING',
  LIQUIDATION_FAILED = 'LIQUIDATION_FAILED',
  TOPPING_UP = 'TOPPING_UP',
  TOP_UP_FAILED = 'TOP_UP_FAILED',
}

export interface SubscriptionReward extends Model {
  amount: number;
  config: SubscriptionProductAllocation;
  duration: number;
  end_date: Date;
  origin: string;
  start_date: Date;
  status: SubscriptionRewardStatus;
  subscription_id: string;
  user_id: string;
}

export enum SubscriptionRewardStatus {
  PENDING = 'PENDING',
  CLAIMED = 'CLAIMED',
  EXPIRED = 'EXPIRED',
  FORFEITED = 'FORFEITED',
}
