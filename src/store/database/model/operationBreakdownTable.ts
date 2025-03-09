import { Model } from '@nozbe/watermelondb';
import { date, field, readonly } from '@nozbe/watermelondb/decorators';

// export interface IOperationBreakDown {
//   created_at?: Date;
//   updated_at?: Date;
//   operation_id: number;
//   operation_name: string;
// }

class OperationBreakDown extends Model {
  static table = 'operation';

  @field('operation_id') operation_id!: number;
  @field('operation_name') operation_name!: string;
  @readonly @date('created_at') createdAt: any;
  @readonly @date('updated_at') updatedAt: any;
}

export { OperationBreakDown };
