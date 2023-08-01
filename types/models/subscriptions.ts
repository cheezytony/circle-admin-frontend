import { Model, User } from '.';

export interface Subscription extends Model {
  user_id: string;
  plan_id: string;
  amount: number;
  frequency: SubscriptionFrequency;
  beneficiary_count: number;
  start_date: Date | null;
  end_date: Date | null;
  next_savings_date: Date | null;
  auto_save: boolean;
  duration: number | null;
  product_allocation: object;

  status: SubscriptionStatus;
  plan?: SubscriptionPlan;
  user?: User;
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
