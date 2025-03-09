// This type will represent the sub-state for getting a single user by ID
export interface ISettingState {
  isLoading: boolean;
  appLoadFirstTime: boolean;
  appStatus: string;
}

export interface IPayload {
  status: boolean;
}
