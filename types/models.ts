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
  SAVINGS = 'SAVINGS',
  INSURANCE = 'INSURANCE',
  STOCK_TRADING = 'STOCK_TRADING',
  LOAN = 'LOAN',
  INVESTMENT = 'INVESTMENT',
  CREDIT_CARD = 'CREDIT_CARD',
  PAYMENT = 'PAYMENT',
  WALLET = 'WALLET',
  AUTH = 'AUTH',
  USER = 'USER',
  NOTIFICATION = 'NOTIFICATION',
  AUDIT = 'AUDIT',
  ACCOUNT_STATEMENT = 'ACCOUNT_STATEMENT',
  ADMIN = 'ADMIN',
}

export enum ConfigurationInputType {
  SWITCH = 'SWITCH',
  CHECKBOX = 'CHECKBOX',
  CHECKBOX_GROUP = 'CHECKBOX_GROUP',
  RADIO = 'RADIO',
  RADIO_GROUP = 'RADIO_GROUP',
  TEXT = 'TEXT',
  CURRENCY = 'CURRENCY',
  NUMBER = 'NUMBER',
  SELECT = 'SELECT',
}

export enum ConfigurationValueType {
  BOOLEAN = 'BOOLEAN',
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  PERCENTAGE = 'PERCENTAGE',
  CURRENCY = 'CURRENCY',
}

export enum ConfigurationValueUnit {
  YEARS = 'YEARS',
  MONTHS = 'MONTHS',
  DAYS = 'DAYS',
  HOURS = 'HOURS',
  MINUTES = 'MINUTES',
  SECONDS = 'SECONDS',
}