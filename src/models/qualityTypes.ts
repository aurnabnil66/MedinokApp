export interface IQualityType {
  id: number;
  name: string;
  workProcess: {
    id: number;
    name: string;
  };
  isOperationWise: number;
  sampleSize: number;
  type: number;
}

export interface IQualityTypes {
  timestamp: number;
  status: string;
  statusCode: number;
  message: string;
  totalCount: number;
  numberOfElements: number;
  content: IQualityType[];
}
