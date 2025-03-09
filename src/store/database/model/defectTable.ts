import { Model } from '@nozbe/watermelondb';
import { date, field, readonly } from '@nozbe/watermelondb/decorators';

// export interface IDefect {
//   created_at?: Date;
//   updated_at?: Date;
//   defect_id: number;
//   defect_name: string;
// }

class Defect extends Model {
  static table = 'defect';

  @field('defect_id') defect_id!: number;
  @field('defect_name') defect_name!: string;
  @readonly @date('created_at') createdAt: any;
  @readonly @date('updated_at') updatedAt: any;
}

export { Defect };
