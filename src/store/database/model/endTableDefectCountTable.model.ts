import { Model } from '@nozbe/watermelondb';
import { date, field, readonly } from '@nozbe/watermelondb/decorators';

class EndTableDefectCount extends Model {
  static table = 'end_table_defect_count';

  @field('defect_id') defect_id!: number;
  @field('defect_name') defect_name!: string;
  @field('count') count!: number;
  @readonly @date('created_at') createdAt: any;
  @readonly @date('updated_at') updatedAt: any;
}

export { EndTableDefectCount };
