import moment from 'moment';

// import { DefectEntryOperation } from '@/store/database/model/defectEntryOperation.model';
import { type DefectEntry } from '@/store/database/model/defectEntry.model';
// import { type IQualityDefect } from '@/store/slices/features/Defect/types';
import {
  type IQualityData,
  type IQualityDefectAPI,
  type IVariance
} from '@/store/slices/features/endTableCheck/types';

export interface IProps {
  orderEntity: number;
  workProcess: number;
  organization: number;
  style: number;
  qualityType: number;
  checkOutput: string;
  deviceId: string;
  repaired: boolean;
  variance?: IVariance | null;
  defectList: IQualityDefectAPI[];
}

export const createDefectArray = (defectList: DefectEntry[]): IQualityDefectAPI[] => {
  try {
    const defectData: IQualityDefectAPI[] = [];

    if (defectList.length > 0) {
      // eslint-disable-next-line
      defectList.forEach(({ defect_id, image_id, part_id, organization_id, position_x, position_y, operation_id }: DefectEntry) => {
          defectData.push({
            defect: {
              id: defect_id
            },
            organization: {
              id: organization_id
            },
            imageId: image_id,
            partId: part_id,
            positionX: position_x,
            positionY: position_y,
            operation: { id: operation_id }
          });
        }
      );
    }
    return defectData;
  } catch (err) {
    return [];
  }
};

export const GenericTransaction = (props: IProps): IQualityData[] => {
  try {
    const pramsList: IQualityData[] = [];
    const pramsObj: IQualityData = {
      orderEntity: {
        id: 0
      },
      workProcess: {
        id: 0
      },
      organization: {
        id: 0
      },
      style: {
        id: ''
      },
      qualityType: {
        id: 0
      },
      newQualityDefect: [],
      sampleSize: 0,
      checkOutput: '',
      productionTime: '',
      transactionId: '',
      deviceId: '',
      isRepaired: false
    };

    const sampleSize = 1;
    const newCreateAtString = moment().format('YYYY-MM-DDTHH:mm:ss');

    pramsObj.deviceId = props.deviceId.toString();
    pramsObj.isRepaired = props.repaired;
    pramsObj.transactionId = GenerateUniqueID();
    pramsObj.checkOutput = props.checkOutput;
    pramsObj.productionTime = newCreateAtString;
    pramsObj.orderEntity.id = props.orderEntity;
    pramsObj.organization.id = props.organization;
    pramsObj.style.id = props.style.toString();
    pramsObj.workProcess.id = props.workProcess;
    pramsObj.sampleSize = sampleSize;
    pramsObj.qualityType.id = props.qualityType;
    pramsObj.newQualityDefect = props.defectList;

    if (props.variance !== null && props.variance !== undefined) {
      pramsObj.varience = props.variance;
    }

    pramsList.push(pramsObj);

    return pramsList;
  } catch (err) {
    return [];
  }
};

export const GenerateUniqueID = (): string => {
  const pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
  return pattern.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
