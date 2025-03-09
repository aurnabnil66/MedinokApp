import { tableSchema } from '@nozbe/watermelondb';

export const OperationSchema = tableSchema({
  name: 'operation',
  columns: [
    {
      name: 'operation_id',
      type: 'number'
    },
    {
      name: 'operation_name',
      type: 'string'
    },
    { name: 'created_at', type: 'number' },
    { name: 'updated_at', type: 'number' }
  ]
});
