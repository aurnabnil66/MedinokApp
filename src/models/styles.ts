export interface IStyles {
  timestamp: number;
  status: string;
  statusCode: number;
  message: string;
  totalCount: number;
  numberOfElements: number;
  content: IStyleContent;
}

export interface IStyleContent {
  styleList: StyleList[];
  lastSyncAt: number[];
}

export interface StyleList {
  id: number;
  name: string;
  smallName?: string;
  smv: number;
  totalOpSmv?: number;
  fob: number;
  cm: number;
  standardWIP?: number;
  organization: Organization;
  item: number;
  manPower?: number;
}

export interface Organization {
  id: number;
  active: boolean;
}
