export interface IApiProductionData {
  timestamp: number;
  status: string;
  statusCode: number;
  message: string;
  totalCount: number;
  numberOfElements: number;
  content: IProductionContentData;
}

export interface IProductionContentData {
  todaysAvg: number;
  todaysMin: number;
  todaysMax: number;
  previousAvg: number;
  previousMin: number;
  previousMax: number;
  production: IProductionItem[];
}

export interface IProductionItem {
  hour: string;
  todayProduction: number;
  previousDayProduction: number;
  efficiency: number;
  productivity: number;
  smv: number;
  dhu: number;
  efficiencyStatus: number;
  productivityStatus: number;
  workigHours: number;
  count: number;
}

export interface XYDataPoint {
  x: number;
  y: number;
}

export interface XendTableGraphData {
  previousAvg: number;
  previousDayProduction: XYDataPoint[];
  previousMax: number;
  previousMin: number;
  todayProduction: XYDataPoint[];
  todaysAvg: number;
  todaysMax: number;
  todaysMin: number;
}
