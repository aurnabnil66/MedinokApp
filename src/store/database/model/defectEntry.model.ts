import { Model } from '@nozbe/watermelondb';
import { date, field, readonly } from '@nozbe/watermelondb/decorators';

class DefectEntry extends Model {
  static table = 'defect_entry';

  @field('defect_id') defect_id!: number;
  @field('defect_name') defect_name!: string;
  @field('defect_type') defec_type!: string;
  @field('organization_id') organization_id!: number;
  @field('image_id') image_id!: number;
  @field('part_id') part_id!: string;
  @field('position_x') position_x!: number;
  @field('position_y') position_y!: number;
  @field('operation_id') operation_id!: number;
  @readonly @date('created_at') createdAt: any;
  @readonly @date('updated_at') updatedAt: any;
}

export { DefectEntry };
