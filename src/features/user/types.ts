/**
 * User Feature - Types
 */
export type User = {
  id: string;
  username: string;
  email?: string;
};

export type UserListResult = {
  list: User[];
  total?: number;
};
