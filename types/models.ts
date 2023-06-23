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
  saving_goal_members: [
    {
      amount_saved: number;
      id: string;
    }
  ];
  saving_extra_details: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
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
export interface LoanRepayment extends Model {
  loan_id: string;
  user_id: string;
  amount: number;
  overdue_fee: number;
  due_date: Date;
  status: string;
}

export interface SavingsTransaction extends Model {
  amount: number;
  reference: string;
  description: string;
  currency: string;
  status: number;
  type: string;
  category: string;
}
export interface ShareAndEarn extends Model {
  _id?: string;
  referrer_id?: {
    firstName: string;
    lastName: string;
    email: string;
    _id: string;
  };
  user_id?: {
    firstName: string;
    lastName: string;
    email: string;
    _id: string;
  };
  status?: String;
  createdAt: Date;
  completedReferrals?: number;
}

export type Admin = User;

export interface Permission extends Model {
  name: string;
  slug: string;
  description: string;
}

export interface Configuration extends Model {
  last_edited_by?: string;
  title: string;
  slug: string;
  description?: string;
  default: string;
  value?: string;
  options?: Array<ConfigurationOption>;
  input_type: ConfigurationInputType;
  value_type: ConfigurationValueType;
  unit_type?: ConfigurationValueUnit;
}

export interface ConfigurationOption {
  title: string;
  value: string;
}

export enum ConfigurationInputType {
  CHECKBOX = 'CHECKBOX',
  CHECKBOX_GROUP = 'CHECKBOX_GROUP',
  CURRENCY = 'CURRENCY',
  NUMBER = 'NUMBER',
  RADIO = 'RADIO',
  RADIO_GROUP = 'RADIO_GROUP',
  RANGE = 'RANGE',
  SELECT = 'SELECT',
  SWITCH = 'SWITCH',
  TEXT = 'TEXT',
}

export enum ConfigurationValueType {
  BOOLEAN = 'BOOLEAN',
  CURRENCY = 'CURRENCY',
  NUMBER = 'NUMBER',
  PERCENTAGE = 'PERCENTAGE',
  STRING = 'STRING',
}

export enum ConfigurationValueUnit {
  DAYS = 'DAYS',
  HOURS = 'HOURS',
  MINUTES = 'MINUTES',
  MONTHS = 'MONTHS',
  SECONDS = 'SECONDS',
  YEARS = 'YEARS',
}
