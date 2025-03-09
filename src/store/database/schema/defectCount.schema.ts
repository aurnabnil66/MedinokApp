import { tableSchema } from '@nozbe/watermelondb';

export const DefectCoutSchema = tableSchema({
  name: 'defect_count',
  columns: [
    {
      name: 'defect_id',
      type: 'number'
    },
    {
      name: 'defect_name',
      type: 'string'
    },
    {
      name: 'count',
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
