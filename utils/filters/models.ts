import { Admin, User } from '~~/types/models';

export const getFullName = (user: User | Admin) => {
  if (!user) return undefined;
  return `${user.first_name} ${user.last_name}`;
};

// export const get
