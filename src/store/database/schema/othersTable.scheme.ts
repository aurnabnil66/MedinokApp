import { tableSchema } from '@nozbe/watermelondb';

export const orgTreeSchema = tableSchema({
  name: 'organization',
  columns: [
    { name: 'org_name', type: 'string' },
    { name: 'created_at', type: 'number' },
    { name: 'updated_at', type: 'number' }
  ]
});

export const transactionSchema = tableSchema({
  name: 'transaction',
  columns: [
    { name: 'orderEntity', type: 'number' },
    { name: 'workProcess', type: 'string' },
    { name: 'organization', type: 'number' },
    { name: 'style', type: 'number' },
    { name: 'qualityType', type: 'number' },
    { name: 'newQualityDefect', type: 'string' }, // Use 'json' type for array-like fields
    { name: 'sampleSize', type: 'number' },
    { name: 'checkOutput', type: 'string' },
    { name: 'productionTime', type: 'string' },
    { name: 'transactionId', type: 'string' },
    { name: 'deviceId', type: 'string' },
    { name: 'isRepaired', type: 'boolean' },
    { name: 'varience', type: 'string' },
    { name: 'created_at', type: 'number' }, // Assuming timestamps are stored as Unix timestamps
    { name: 'updated_at', type: 'number' }
  ]
});

export const CountSchema = tableSchema({
  name: 'count',
  columns: [
    { name: 'total', type: 'number' },
    { name: 'repairPass', type: 'number' },
    { name: 'repairAlter', type: 'number' },
    { name: 'repairReject', type: 'number' },
    { name: 'pass', type: 'number' },
    { name: 'alter', type: 'number' },
    { name: 'reject', type: 'number' },
    { name: 'offlinePass', type: 'number' },
    { name: 'created_at', type: 'number' }, // Assuming timestamps are stored as Unix timestamps
    { name: 'updated_at', type: 'number' },
    { name: 'productionFireTime', type: 'string' }
  ]
});

export const TempDataSchema = tableSchema({
  name: 'tempTable',
  columns: [
    { name: 'tampAlter', type: 'number' },
    { name: 'created_at', type: 'number' }, // Assuming timestamps are stored as Unix timestamps
    { name: 'updated_at', type: 'number' }
  ]
});
