import { Model } from '@nozbe/watermelondb';
import { date, field, readonly } from '@nozbe/watermelondb/decorators';

class DefectEntryOperation extends Model {
  static table = 'defect_entry_operation';

  @field('operation_id') operation_id!: number;
  @readonly @date('created_at') createdAt: any;
  @readonly @date('updated_at') updatedAt: any;
}

export { DefectEntryOperation };
