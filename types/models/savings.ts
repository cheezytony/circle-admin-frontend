import { Model, User } from '.';

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
  user: User;
}

export interface SavingGoalMember {
  amount_saved: number;
  id: string;
  leader_board: {
    point: number;
    is_participating: boolean;
  };
  status: string;
  user_id: string;
  user: User;
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

export const SavingsTransactionEx = {} as SavingsTransaction;
