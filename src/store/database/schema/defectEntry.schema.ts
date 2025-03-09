import { tableSchema } from '@nozbe/watermelondb';

export const DefectEntrySchema = tableSchema({
  name: 'defect_entry',
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
      name: 'defect_type',
      type: 'string'
    },
    {
      name: 'organization_id',
      type: 'number'
    },
    {
      name: 'image_id',
      type: 'number'
    },
    {
      name: 'part_id',
      type: 'string'
    },
    {
      name: 'position_x',
      type: 'number'
    },
    {
      name: 'position_y',
      type: 'number'
    },
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
