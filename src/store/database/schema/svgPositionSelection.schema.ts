import { tableSchema } from '@nozbe/watermelondb';

export const SvgPositionSlectionSchema = tableSchema({
  name: 'svg_position_selection',
  columns: [
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
      name: 'created_at',
      type: 'number'
    },
    {
      name: 'updated_at',
      type: 'number'
    }
  ]
});
