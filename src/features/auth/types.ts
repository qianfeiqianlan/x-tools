/**
 * Auth Feature - Types
 */
export type LoginInput = {
  username: string;
  password: string;
};

export type LoginResult = {
  token: string;
  user?: { id: string; username: string };
};
