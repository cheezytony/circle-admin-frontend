export interface Model {
  id: string;
  created_at: Date;
  updated_at: Date;
}

export * from './admin';
export * from './configurations';
export * from './loans';
export * from './savings';
export * from './stocks';
export * from './subscriptions';
export * from './wallet';
export * from './user-data';
