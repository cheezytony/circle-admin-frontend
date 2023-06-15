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
