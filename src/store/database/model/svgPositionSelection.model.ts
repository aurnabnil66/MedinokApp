import { Model } from '@nozbe/watermelondb';
import { date, field, readonly } from '@nozbe/watermelondb/decorators';

class SvgPositionSlection extends Model {
  static table = 'svg_position_selection';

  @field('image_id') image_id!: number;
  @field('part_id') part_id!: string;
  @field('position_x') position_x!: number;
  @field('position_y') position_y!: number;
  @readonly @date('created_at') createdAt: any;
  @readonly @date('updated_at') updatedAt: any;
}

export { SvgPositionSlection };
