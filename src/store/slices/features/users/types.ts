import { type AccessTokenInfo } from '@/store/types/types';

// Define the user type
export interface UserType {
  id: string;
  name: string;
  lastname: string;
  email: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// This type will represent the sub-state for getting a single user by ID
export interface IUserState {
  data: AccessTokenInfo | null;
  isLoading: boolean;
  errors: string;
  loginStatus: boolean;
}

// The users global state
export interface UsersStateType {
  user: IUserState;

  // Later, we can add other sub-states like:
  // list,
  // create,
  // update,
  // remove
}

export interface ILogInPayload {
  mobile: string;
  password: string;
}

export interface ISignUpPayload {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
}

// export type USERS = typeof USERS; // Typescript line

// // (2)
// export type GET_USER_BY_ID = typeof GET_USER_BY_ID; // Typescript line

interface WorkProcess {
  id: number;
  name: string;
}

export interface ContentItem {
  id: number;
  name: string;
  workProcess: WorkProcess;
  isOperationWise: number;
  sampleSize: number;
  type: number;
}
