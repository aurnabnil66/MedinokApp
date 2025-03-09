import { Model } from '@nozbe/watermelondb';
import { date, field, readonly } from '@nozbe/watermelondb/decorators';

class Buyer extends Model {
  static table = 'buyers';
  // static associations = associations(['styles', { type: 'has_many', foreignKey: 'buyer_id' }]);

  @field('buyer_id') buyer_id!: number;
  @field('buyer_name') buyer_name!: string;
  @readonly @date('created_at') createdAt: any;
  @readonly @date('updated_at') updatedAt: any;
  // @children('styles') styles!: Relation<Style>;
}

class Style extends Model {
  static table = 'styles';
  // static associations = associations(['buyers', { type: 'belongs_to', key: 'buyer_id' }]);

  @field('style_id') style_id!: number;
  @field('style_name') style_name!: string;
  @field('buyer_id') buyer_id!: number;
  @field('item_id') item_id!: number;
  @readonly @date('created_at') createdAt: any;
  @readonly @date('updated_at') updatedAt: any;
  // @relation('buyers', 'buyer_id') buyer!: Relation<Buyer>;
}

class Order extends Model {
  static table = 'orders';

  @field('orderId') orderId!: number;
  @field('name') name!: string;
  @field('style_id') style_id!: number;
  @field('buyer_id') buyer_id!: number;
  @readonly @date('created_at') createdAt: any;
  @readonly @date('updated_at') updatedAt: any;
  // @relation('styles', 'styleId') style: any;
  // @children('variances') variances: any;
}

class Variance extends Model {
  static table = 'variances';

  @field('varianceId') varianceId!: number;
  @field('color') color!: string;
  @field('size') size!: string;
  @field('orderQuantity') orderQuantity!: number;
  @field('orderId') orderId!: number;
  @readonly @date('created_at') createdAt: any;
  @readonly @date('updated_at') updatedAt: any;
  // @relation('orders', 'orderId') order: any;
}

export { Buyer, Order, Style, Variance };
