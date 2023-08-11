import { Model } from '.';

export interface User {
  _id: string;
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  deviceId: string;
  pushToken: string;
  passwordChangedAt: Date;
  lastLogin: Date;
  isActive: boolean;
  isEmailVerified: boolean;
  phoneNumber: string;
  countryCode: string;
  phoneNumberVerifiedAt: Date;
  hasSecurityQuestion: boolean;
  isPinSetup: boolean;

  createdAt: Date;
  updatedAt: Date;

  profile?: UserProfile;
}

export interface UserProfile {
  _id: string;
  id: string;
  address?: {
    city: string;
    country: string;
    postalCode: string;
    state: string;
    street: string;
  };
  annualIncome: number;
  dateOfBirth: Date;
  dependents: 0;
  employer: string;
  employmentStatus: string;
  employmentType: string;
  investmentExperience: string;
  investmentObjectives: string;
  maritalStatus: string;
  networthLiquid: number;
  networthTotal: number;
  politicallyExposedNames: string;
  position: string;
  primarySourceOfIncome: string;
  riskTolerance: string;
  salary: number;
  salaryDay: number;
  updatedAt: Date;
  usTaxPayer: false;
  user: string;

  createdAt: Date;
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
  status?: string;
  createdAt: Date;
  total_count?: number;
}
