import { Model } from './';

export interface Admin extends Model {
  avatar?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  role: string;
  password_changed_at?: string;
}

export interface Permission extends Model {
  slug: string;
  description: string;
}
