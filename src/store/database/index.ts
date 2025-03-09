import { appSchema, Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import { Buyer, Order, Style, Variance } from './model/buyerStyleOrderTable.model';
import { DefectCount } from './model/defectCount.model';
import { DefectEntry } from './model/defectEntry.model';
import { DefectEntryOperation } from './model/defectEntryOperation.model';
import { DefectEntrySketch } from './model/defectEntrySketch.model';
import { Defect } from './model/defectTable';
import { EndTableDefectCount } from './model/endTableDefectCountTable.model';
import { OperationBreakDown } from './model/operationBreakdownTable';
import { Count, Organization_name, TempData, Transaction } from './model/othersTable.model';
import { SvgPositionSlection } from './model/svgPositionSelection.model';
import {
  buyerSchema,
  oderSchema,
  styleSchema,
  varianceSchema
} from './schema/buyerStyleOrderTable.scheme';
import { DefectCoutSchema } from './schema/defectCount.schema';
import { DefectEntrySchema } from './schema/defectEntry.schema';
import { DefectEntryOperationSchema } from './schema/defectEntryOperation.schema';
import { DefectEntrySketchSchema } from './schema/defectEntrySketch.schema';
import { DefectSchema } from './schema/defectTable.schema';
import { EndTableDefectCoutSchema } from './schema/endTableDefectCount.schema';
import { OperationSchema } from './schema/operationBreakDownTable.schema';
import {
  CountSchema,
  orgTreeSchema,
  TempDataSchema,
  transactionSchema
} from './schema/othersTable.scheme';
import { SvgPositionSlectionSchema } from './schema/svgPositionSelection.schema';
const version = 1.4;

const schema = appSchema({
  version,
  tables: [
    buyerSchema,
    styleSchema,
    oderSchema,
    varianceSchema,
    orgTreeSchema,
    transactionSchema,
    CountSchema,
    OperationSchema,
    DefectSchema,
    DefectEntrySchema,
    DefectCoutSchema,
    DefectEntryOperationSchema,
    EndTableDefectCoutSchema,
    DefectEntrySketchSchema,
    SvgPositionSlectionSchema,
    TempDataSchema
  ]
});

const adapter = new SQLiteAdapter({
  schema
});

const database = new Database({
  adapter,
  modelClasses: [
    Style,
    Buyer,
    Order,
    Variance,
    Organization_name,
    Transaction,
    Count,
    OperationBreakDown,
    Defect,
    DefectEntry,
    DefectCount,
    DefectEntryOperation,
    DefectEntrySketch,
    SvgPositionSlection,
    EndTableDefectCount,
    TempData
  ]
});

const initializeData = async (): Promise<void> => {
  await database.write(async (): Promise<void> => {
    const countCollection = database.collections.get('count');

    // Check if there are any existing records in the count table
    const existingCount = await countCollection.query().fetchCount();

    // If no records exist, insert initial data
    if (existingCount === 0) {
      await countCollection.create((count: any) => {
        count.total = 0;
        count.pass = 0;
        count.alter = 0;
        count.reject = 0;
        count.offlinePass = 0;
        count.created_at = Date.now();
        count.updated_at = Date.now();
      });
    }
  });
};

const initializeDatabase = async (): Promise<void> => {
  await initializeData(); // Initialize initial data
};

initializeDatabase().catch(console.error);

export default database;
