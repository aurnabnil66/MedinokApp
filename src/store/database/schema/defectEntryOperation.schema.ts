import { tableSchema } from '@nozbe/watermelondb';

export const DefectEntryOperationSchema = tableSchema({
  name: 'defect_entry_operation',
  columns: [
    {
      name: 'operation_id',
      type: 'number'
    },
    {
      name: 'created_at',
      type: 'number'
    },
    {
      name: 'updated_at',
      type: 'number'
    }
  ]
});
