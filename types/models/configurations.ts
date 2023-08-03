import { Model } from '.';

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
