import { tableSchema } from '@nozbe/watermelondb';

export const DefectSchema = tableSchema({
  name: 'defect',
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
      name: 'created_at',
      type: 'number'
    },
    {
      name: 'updated_at',
      type: 'number'
    }
  ]
});
