import { Model } from '.';

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
