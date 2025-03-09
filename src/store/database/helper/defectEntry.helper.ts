import { type Collection, Q } from '@nozbe/watermelondb';

import { type IDefect, type IOperationBreakDown } from '@/models/defect';
import { type IQualityDefect, type ISvgSelection } from '@/store/slices/features/DefectList/types';

import { type DefectCount } from '../model/defectCount.model';
import { type DefectEntry } from '../model/defectEntry.model';
import { type DefectEntryOperation } from '../model/defectEntryOperation.model';
import { type DefectEntrySketch } from '../model/defectEntrySketch.model';
import { type Defect } from '../model/defectTable';
import { type EndTableDefectCount } from '../model/endTableDefectCountTable.model';
import { type OperationBreakDown } from '../model/operationBreakdownTable';
import { type SvgPositionSlection } from '../model/svgPositionSelection.model';
import database from '..';

export const handleInsertDefectListInDB = async (defectListData: IDefect): Promise<void> => {
  try {
    await database.write(async () => {
      const defectCollection: Collection<Defect> = database.collections.get('defect');
      for (const defect of defectListData.data.content.defects) {
        await defectCollection.create((d: Defect) => {
          d.defect_id = defect.id;
          d.defect_name = defect.name;
        });
      }
    });
  } catch (e) {
    console.warn('Defect list data  not set', e);
  }
};

export const handleInsertOperationListInDB = async (
  filterdOperationsBreakDownData: IOperationBreakDown[]
): Promise<void> => {
  try {
    await database.write(async () => {
      const operationCollection: Collection<OperationBreakDown> =
        database.collections.get('operation');
      for (const operationData of filterdOperationsBreakDownData) {
        await operationCollection.create((operation: OperationBreakDown) => {
          operation.operation_id = operationData.operation.id;
          operation.operation_name = operationData.operation.name;
        });
      }
    });
  } catch (e) {
    console.warn('Operation filter data not set', e);
  }
};

export const handleDeletDefectTableFromDB = async (): Promise<void> => {
  try {
    await database.write(async () => {
      const defectCollection = await database.collections.get('defect').query().fetch();
      const deletedDefect = defectCollection.map(defect => defect.prepareDestroyPermanently());
      await database.batch(...deletedDefect);
    });
  } catch (e) {
    console.warn('Defect list data  not deleted', e);
  }
};

export const handleDeletOperationTableFromDB = async (): Promise<void> => {
  try {
    await database.write(async () => {
      const operationCollection = await database.collections.get('operation').query().fetch();
      const deletedOperation = operationCollection.map(operation =>
        operation.prepareDestroyPermanently()
      );
      await database.batch(...deletedOperation);
    });
  } catch (e) {
    console.warn('Operation  data not deleted', e);
  }
};

export const addDefectItemCount = async (qualityDefectData: IQualityDefect): Promise<void> => {
  const IsDefectCountExist = await checkDefectCountExist(qualityDefectData.defect.id);
  const { defect } = qualityDefectData;
  if (IsDefectCountExist) {
    void defectItemCountIncrement(defect.id);
  }
  if (!IsDefectCountExist) {
    try {
      await database.write(async () => {
        const defectCountCollection: Collection<DefectCount> =
          database.collections.get('defect_count');
        await defectCountCollection.create((defectCount: DefectCount) => {
          defectCount.defect_id = defect.id;
          defectCount.defect_name = defect.name;
          defectCount.count = 1;
        });
      });
    } catch (e) {
      console.warn('Defect count not set', e);
    }
  }
};

export const addEndTableDefectItemCount = async (
  defecId: number,
  defectName: string
): Promise<void> => {
  const IsDefectCountExist = await checkIfEndTbaleDefectItemExist(defecId);
  if (IsDefectCountExist) {
    void endTableDefectItemCountIncrement(defecId);
  }
  if (!IsDefectCountExist) {
    try {
      await database.write(async () => {
        const defectCountCollection: Collection<EndTableDefectCount> =
          database.collections.get('end_table_defect_count');
        await defectCountCollection.create((defectCount: EndTableDefectCount) => {
          defectCount.defect_id = defecId;
          defectCount.defect_name = defectName;
          defectCount.count = 1;
        });
      });
    } catch (e) {
      console.warn('End Table Defect count not set', e);
    }
  }
};

export const deleteQualityDefect = async (defectId: number, partId: string): Promise<void> => {
  try {
    await database.write(async () => {
      const selectedDefectEntry = await database.collections
        .get('defect_entry')
        .query(Q.where('defect_id', defectId), Q.where('part_id', partId))
        .fetch();
      const defectEntry = await database.collections
        .get('defect_entry')
        .find(selectedDefectEntry[0].id);
      await defectEntry.destroyPermanently();
    });
  } catch (e) {
    console.warn('Quality Defect Item not deleted', e);
  }
};

export const handleDeleteDefectEntryOperation = async (): Promise<void> => {
  try {
    await database.write(async () => {
      const defectEntryOperationCollection = await database.collections
        .get('defect_entry_operation')
        .query()
        .fetch();
      const deletedOperation = defectEntryOperationCollection.map(defectEntryOperation =>
        defectEntryOperation.prepareDestroyPermanently()
      );
      await database.batch(...deletedOperation);
    });
  } catch (e) {
    console.warn('Defect Entry operation  not deleted', e);
  }
};
export const handleDeleteDefectSketch = async (): Promise<void> => {
  try {
    await database.write(async () => {
      const defectEntrySketchCollection = await database.collections
        .get('defect_entry_sketch')
        .query()
        .fetch();
      const deletedOperation = defectEntrySketchCollection.map(defectEntrySketch =>
        defectEntrySketch.prepareDestroyPermanently()
      );
      await database.batch(...deletedOperation);
    });
  } catch (e) {
    console.warn('Defect Entry sketch  not deleted', e);
  }
};

export const addDefectEntryOperation = async (operationId: number): Promise<void> => {
  const defectEntryOperationCount = await database.collections
    .get('defect_entry_operation')
    .query()
    .fetchCount();
  if (defectEntryOperationCount >= 1) {
    await handleDeleteDefectEntryOperation();
  }
  try {
    await database.write(async () => {
      const defectEntryOperationCollection: Collection<DefectEntryOperation> =
        database.collections.get('defect_entry_operation');
      await defectEntryOperationCollection.create((defectEntryOperation: DefectEntryOperation) => {
        defectEntryOperation.operation_id = operationId;
      });
    });
  } catch (e) {
    console.warn('Defect Entry operation  not inserted', e);
  }
};

export const addDefectEntrySketch = async (
  imageId: number,
  partId: string,
  positionX: number,
  positionY: number
): Promise<void> => {
  const defectEntryOperationCount = await database.collections
    .get('defect_entry_sketch')
    .query()
    .fetchCount();
  if (defectEntryOperationCount >= 1) {
    await handleDeleteDefectSketch();
  }
  try {
    await database.write(async () => {
      const defectEntrySketchCollection: Collection<DefectEntrySketch> =
        database.collections.get('defect_entry_sketch');
      await defectEntrySketchCollection.create((defectEntrySketch: DefectEntrySketch) => {
        defectEntrySketch.image_id = imageId;
        defectEntrySketch.part_id = partId;
        defectEntrySketch.position_x = positionX;
        defectEntrySketch.position_y = positionY;
      });
    });
  } catch (e) {
    console.warn('Defect Entry Sketch  not inserted', e);
  }
};

export const addQualityDefect = async (qualityDefectData: IQualityDefect): Promise<void> => {
  const { defecType, imageId, positionX, positionY, partId, defect, operation, organization } =
    qualityDefectData;
  try {
    await database.write(async () => {
      const defectEntryCollection: Collection<DefectEntry> =
        database.collections.get('defect_entry');
      await defectEntryCollection.create((defectEntry: DefectEntry) => {
        defectEntry.defec_type = defecType;
        defectEntry.defect_id = defect.id;
        defectEntry.defect_name = defect.name;
        defectEntry.organization_id = organization.id;
        defectEntry.image_id = imageId ?? 0;
        defectEntry.part_id = partId ?? '';
        defectEntry.position_x = positionX ?? 0;
        defectEntry.position_y = positionY ?? 0;
        defectEntry.operation_id = operation.id ?? 0;
      });
    });
  } catch (e) {
    console.warn('Defect Entry not set', e);
  }
};
export const addSvgPositionSelection = async (svgItem: ISvgSelection): Promise<void> => {
  try {
    await database.write(async () => {
      const svgPositionSlectionCollection: Collection<SvgPositionSlection> =
        database.collections.get('svg_position_selection');
      await svgPositionSlectionCollection.create((svgPositionSlection: SvgPositionSlection) => {
        svgPositionSlection.image_id = svgItem.imageId;
        svgPositionSlection.part_id = svgItem.partId;
        svgPositionSlection.position_x = svgItem.positionX;
        svgPositionSlection.position_y = svgItem.positionY;
      });
    });
  } catch (e) {
    console.warn('Defect Entry not set', e);
  }
};

export const checkIfDefectItemExist = async (
  defectId: number,
  partId: string
): Promise<boolean> => {
  const existingdDefect = await database.collections
    .get('defect_entry')
    .query(Q.where('defect_id', defectId), Q.where('part_id', partId))
    .fetchCount();
  if (existingdDefect >= 1) {
    return true;
  } else {
    return false;
  }
};
export const checkIfEndTbaleDefectItemExist = async (defectId: number): Promise<boolean> => {
  const existingdDefect = await database.collections
    .get('end_table_defect_count')
    .query(Q.where('defect_id', defectId))
    .fetchCount();
  if (existingdDefect >= 1) {
    return true;
  } else {
    return false;
  }
};

export const defectItemCountDecrease = async (defectId: number): Promise<void> => {
  try {
    await database.write(async () => {
      const selectedDefectCount = await database.collections
        .get('defect_count')
        .query(Q.where('defect_id', defectId))
        .fetch();
      // console.warn('call');
      const defectCount = await database.collections
        .get('defect_count')
        .find(selectedDefectCount[0].id);
      await defectCount.update((defect: any) => {
        defect.count = defect.count - 1;
        if (defect.count === 0) void defectCount.destroyPermanently();
      });
    });
  } catch (e) {
    console.warn('Defect item count not decrese', e);
  }
};

export const endTableDefectItemCountDecrease = async (defectId: number): Promise<void> => {
  try {
    await database.write(async () => {
      const selectedDefectCount = await database.collections
        .get('end_table_defect_count')
        .query(Q.where('defect_id', defectId))
        .fetch();
      const defectCount = await database.collections
        .get('end_table_defect_count')
        .find(selectedDefectCount[0].id);
      await defectCount.update((defect: any) => {
        defect.count = defect.count - 1;
        if (parseInt(defect.count) === 0) void defectCount.destroyPermanently();
      });
    });
  } catch (e) {
    console.warn('End table Defect item count not decrese', e);
  }
};

export const defectItemCountIncrement = async (defectId: number): Promise<void> => {
  try {
    await database.write(async () => {
      const selectedDefectCount = await database.collections
        .get('defect_count')
        .query(Q.where('defect_id', defectId))
        .fetch();

      const defectItemId = selectedDefectCount[0].id;
      const defectCount = await database.collections.get('defect_count').find(defectItemId);
      // console.warn(defectCount);
      await defectCount.update((defect: any) => {
        defect.count = parseInt(defect.count) + 1;
      });
    });
  } catch (e) {
    console.warn('Defect item count not incremented', e);
  }
};

export const endTableDefectItemCountIncrement = async (defectId: number): Promise<void> => {
  try {
    await database.write(async () => {
      const selectedDefectCount = await database.collections
        .get('end_table_defect_count')
        .query(Q.where('defect_id', defectId))
        .fetch();

      const defectItemId = selectedDefectCount[0].id;
      const defectCount = await database.collections
        .get('end_table_defect_count')
        .find(defectItemId);
      // console.warn(defectCount);
      await defectCount.update((defect: any) => {
        defect.count = parseInt(defect.count) + 1;
      });
    });
  } catch (e) {
    console.warn('Defect item count not incremented', e);
  }
};

export const checkDefectCountExist = async (defectId: number): Promise<boolean> => {
  // const defectCountCollection: Collection<DefectCount> = await database.collections.get('defect_count');
  const defectCountExist = await database.collections
    .get('defect_count')
    .query(Q.where('defect_id', defectId))
    .fetchCount();
  if (defectCountExist >= 1) {
    // console.warn("Call defect  item exist");
    return true;
  } else return false;
};

export const handleDeleteDefectEntry = async (): Promise<void> => {
  await database.write(async () => {
    const defectEntryCollection = await database.collections.get('defect_entry').query().fetch();
    const deletedOperation = defectEntryCollection.map(defectEntry =>
      defectEntry.prepareDestroyPermanently()
    );
    await database.batch(...deletedOperation);
  });
};

export const handleDeleteDefectCount = async (): Promise<void> => {
  await database.write(async () => {
    const defectCountCollection = await database.collections.get('defect_count').query().fetch();
    const deletedOperation = defectCountCollection.map(defectCount =>
      defectCount.prepareDestroyPermanently()
    );
    await database.batch(...deletedOperation);
  });
};

export const handleDeleteEndTableDefectCount = async (): Promise<void> => {
  await database.write(async () => {
    const defectCountCollection = await database.collections
      .get('end_table_defect_count')
      .query()
      .fetch();
    const deletedOperation = defectCountCollection.map(defectCount =>
      defectCount.prepareDestroyPermanently()
    );
    await database.batch(...deletedOperation);
  });
};
export const handleDeleteSvgPositionSelection = async (): Promise<void> => {
  await database.write(async () => {
    const svgPositionSelectionCollection = await database.collections
      .get('svg_position_selection')
      .query()
      .fetch();
    const deletedOperation = svgPositionSelectionCollection.map(svgPositionSelection =>
      svgPositionSelection.prepareDestroyPermanently()
    );
    await database.batch(...deletedOperation);
  });
};

export const checkDefectEntryTableDefectType = async (): Promise<DefectEntry[] | undefined> => {
  try {
    const defectEntryCollection: Collection<DefectEntry> = database.collections.get('defect_entry');
    return await defectEntryCollection.query().fetch();
  } catch (e) {}
};

export const undoLastEndTableDefectItemCount = async (): Promise<void> => {
  try {
    const defectEntryCollection: Collection<DefectEntry> = database.collections.get('defect_entry');
    await database.write(async () => {
      const defectList = await defectEntryCollection.query().fetch();
      defectList.map(async el => {
        await endTableDefectItemCountDecrease(el.defect_id);
      });
    });
    await handleDeleteDefectEntry();
  } catch (e) {}
};

export const addTempAlterCount = async (incremented: boolean): Promise<void> => {
  try {
    await database.write(async () => {
      const selectedTempDefectCount = await database.collections.get('tempTable').query().fetch();

      if (selectedTempDefectCount.length === 0) {
        await database.get('tempTable').create((temp: any) => {
          temp.tampAlter = 1;
        });
      } else {
        const tempTable = await database.collections.get('tempTable').query().fetch();

        const tempRecord = tempTable[0].id;

        if (tempRecord !== undefined) {
          const tempRecordCount = await database.collections.get('tempTable').find(tempRecord);

          await tempRecordCount.update((temp: any) => {
            let newTampAlterValue = incremented
              ? parseInt(temp.tampAlter) + 1
              : parseInt(temp.tampAlter) - 1;

            if (newTampAlterValue < 0) {
              newTampAlterValue = 0; // Ensure the value is not negative
            }

            temp.tampAlter = newTampAlterValue;
          });
        }
      }
    });
  } catch (e) {
    console.warn('tempTable item count not incremented', e);
  }
};
