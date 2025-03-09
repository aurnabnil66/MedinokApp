import { Model } from '@nozbe/watermelondb';
import { date, field, readonly } from '@nozbe/watermelondb/decorators';

class DefectEntrySketch extends Model {
  static table = 'defect_entry_sketch';

  @field('image_id') image_id!: number;
  @field('part_id') part_id!: string;
  @field('position_x') position_x!: number;
  @field('position_y') position_y!: number;
  @readonly @date('created_at') createdAt: any;
  @readonly @date('updated_at') updatedAt: any;
}

export { DefectEntrySketch };
