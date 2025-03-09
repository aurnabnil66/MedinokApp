export interface IDataObject {
  data: IData;
  message: string;
}
export interface IData {
  timestamp: number;
  status: string;
  statusCode: number;
  message: string;
  totalCount: number;
  numberOfElements: number;
  content: IContent;
}
export interface IContent {
  lastSyncAt: number[];
  appItemImages: AppItemImage[];
}
export interface AppItemImage {
  item_id: string;
  imageDetailsList: ImageDetail[];
}
export interface ImageDetail {
  path: string;
  name: string;
  svgObj: SvgObj[];
  id: number;
}
export interface SvgObj {
  id: string;
  data_name: string;
  transform: string;
  d: string;
  stroke?: string;
  fill?: string;
}
export interface ISvgItemProps {
  fabrics: ImageDetail;
  index: number;
}

export interface WorkProcess {
  id: number;
  name: string;
}
export interface Defects {
  id: number;
  type: string;
  workProcess: WorkProcess;
  name: string;
}
export interface DefectContent {
  defects: Defects[];
  lastSyncAt: number[];
}
export interface IDefect {
  data: IDefectData;
  message: string;
}

export interface IDefectData {
  timestamp: number;
  status: string;
  statusCode: number;
  message: string;
  totalCount: number;
  numberOfElements: number;
  content: DefectContent;
}

export interface Operation {
  id: number;
  name: string;
  smv: number;
  type?: string;
  proxyCardNo?: string;
  criticalIndex?: number;
  workProcess: {
    id: number;
    name: string;
  };
  organization: {
    id: number;
    name: string;
    active: boolean;
  };
}
export interface OperationContent {
  operations: Operation[];
  lastSyncAt: number[];
}
export interface IOperations {
  timestamp: number;
  status: string;
  statusCode: number;
  message: string;
  totalCount: number;
  numberOfElements: number;
  content: OperationContent;
}

export interface IOperationBreakDowns {
  data: IOperationBreakDownsData;
  message: string;
}

export interface IOperationBreakDownsData {
  timestamp: number;
  status: string;
  statusCode: number;
  message: string;
  totalCount: number;
  numberOfElements: number;
  content: IOperationBreakDownContent;
}

export interface IOperationBreakDownContent {
  operationBreakDowns: IOperationBreakDown[];
  lastSyncAt: number[];
}

export interface IOperationBreakDown {
  id: number;
  style: Style;
  operation: IOperationBreakDownsOperation;
  smv: number;
  allowance: number;
  machineQuantity: number;
  length: number;
  spi: number;
  sequence: number;
  scissorCut: number;
  isLast?: boolean;
  active: boolean;
}

export interface Style {
  id: number;
  name: string;
  fob: number;
  cm: number;
}

export interface IOperationBreakDownsOperation {
  id: number;
  name: string;
  smv: number;
}

export interface IDefectSequence {
  data: IDefectSequenceData;
  message: string;
}

export interface IDefectSequenceData {
  timestamp: number;
  status: string;
  statusCode: number;
  message: string;
  totalCount: number;
  numberOfElements: number;
  content: IDefectSequenceContent[];
}

export interface IDefectSequenceContent {
  id: number;
  cuttingLeadTime: number;
  storeLeadTime: number;
  editableDayForCuttingHistory: number;
  requireQuantity: number;
  statusLightMax: number;
  statusLightMin: number;
  qmsDefectSequence: string;
  isSizeControl: boolean;
  excessInput: number;
  scanningRequired: boolean;
  wipcontrolStatus: boolean;
}
