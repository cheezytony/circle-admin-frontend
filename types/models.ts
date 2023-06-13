interface Model {
  id: string;

  created_at: Date;
  updated_at: Date;
}

export interface User extends Model {
  avatar?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  role: string;
  password_changed_at?: string;
}
export interface Saving extends Model {
  amount_saved: number;
  frequency: string;
  interest_rate: number;
  amount_to_debit: number;
  earnings_withdrawn: number;
  status: string;
  earnings: number;
  user_id?: string;
  funding_source?: string;
  auto_save: boolean;
  auto_save_day: string;
  auto_save_time: string;
  currency: string;
  next_auto_save_date: Date;
  target_amount: number;
  total_earnings: number;
  start_date: Date;
  description?: string;
  name?: string;
  end_date: Date;
  saving_goal_members: [];
  saving_extra_details: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
  password_changed_at?: string;
}

export interface SavingGoalMember {
  amount_saved: number;
  id: string;
  leader_board: {
    point: number;
    is_participating: boolean;
  };
  saving_extra_details: {
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
  };
  status: string;
  user_id: string;
}
export interface Loan extends Model {
  loan_amount: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  disbursed_amount: number;
  request_amount: string;
  interest_rate: number;
  collateral: number;
  disbursed_at: Date;
  status: string;
  tenure: number;
  user_id?: string;
}
export interface Transaction extends Model {
  amount: number;
  reference: string;
  description: string;
  currency: string;
  status: number;
  type: string;
}
export interface ShareAndEarn extends Model {
  _id?: string;
  referrerId?: {
    firstName: string;
    lastName: string;
    email: string;
    _id: string;
  };
  userId?: {
    firstName: string;
    lastName: string;
    email: string;
    _id: string;
  };
  status?: String;
  createdAt: Date;
  completedReferrals?: number;
}

export interface Admin extends User {}

export interface Configuration extends Model {
  configuration_group?: ConfigurationGroup;
  title: string;
  slug: string;
  options?: Array<{ title: string; value: string }>;
  default: string;
  value?: string;
  input_type: ConfigurationInputType;
  value_type: ConfigurationValueType;
  unit_type?: ConfigurationValueUnit;
}

export interface Permission extends Model {
  name: string;
  slug: string;
  description: string;
}

export enum ConfigurationGroup {
  SAVINGS = "SAVINGS",
  INSURANCE = "INSURANCE",
  STOCK_TRADING = "STOCK_TRADING",
  LOAN = "LOAN",
  INVESTMENT = "INVESTMENT",
  CREDIT_CARD = "CREDIT_CARD",
  PAYMENT = "PAYMENT",
  WALLET = "WALLET",
  AUTH = "AUTH",
  USER = "USER",
  NOTIFICATION = "NOTIFICATION",
  AUDIT = "AUDIT",
  ACCOUNT_STATEMENT = "ACCOUNT_STATEMENT",
  ADMIN = "ADMIN",
}

export enum ConfigurationInputType {
  SWITCH = "SWITCH",
  CHECKBOX = "CHECKBOX",
  CHECKBOX_GROUP = "CHECKBOX_GROUP",
  RADIO = "RADIO",
  RADIO_GROUP = "RADIO_GROUP",
  TEXT = "TEXT",
  CURRENCY = "CURRENCY",
  NUMBER = "NUMBER",
  SELECT = "SELECT",
}

export enum ConfigurationValueType {
  BOOLEAN = "BOOLEAN",
  STRING = "STRING",
  NUMBER = "NUMBER",
  PERCENTAGE = "PERCENTAGE",
  CURRENCY = "CURRENCY",
}

export enum ConfigurationValueUnit {
  YEARS = "YEARS",
  MONTHS = "MONTHS",
  DAYS = "DAYS",
  HOURS = "HOURS",
  MINUTES = "MINUTES",
  SECONDS = "SECONDS",
}
