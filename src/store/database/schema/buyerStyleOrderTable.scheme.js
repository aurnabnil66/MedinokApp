// // database/schema.ts

import { tableSchema } from '@nozbe/watermelondb';

export const buyerSchema = tableSchema({
  name: 'buyers',
  columns: [
    {
      name: 'buyer_id',
      type: 'number'
    },
    {
      name: 'buyer_name',
      type: 'string'
    },
    { name: 'buyer_id', type: 'number', isIndexed: true },
    { name: 'created_at', type: 'number' },
    { name: 'updated_at', type: 'number' }
  ]
});

export const styleSchema = tableSchema({
  name: 'styles',
  columns: [
    { name: 'style_id', type: 'number', isIndexed: true },
    { name: 'style_name', type: 'string' },
    { name: 'buyer_id', type: 'number' },
    { name: 'created_at', type: 'number' },
    { name: 'updated_at', type: 'number' },
    { name: 'item_id', type: 'number' }
  ]
});

export const oderSchema = tableSchema({
  name: 'orders',
  columns: [
    { name: 'orderId', type: 'number', isIndexed: true },
    { name: 'name', type: 'string' },
    { name: 'style_id', type: 'number' },
    { name: 'buyer_id', type: 'number' },
    { name: 'created_at', type: 'number' },
    { name: 'updated_at', type: 'number' }
  ]
});

export const varianceSchema = tableSchema({
  name: 'variances',
  columns: [
    { name: 'varianceId', type: 'number', isIndexed: true },
    { name: 'color', type: 'string' },
    { name: 'size', type: 'string' },
    { name: 'orderQuantity', type: 'number' },
    { name: 'orderId', type: 'number', isIndexed: true },
    { name: 'created_at', type: 'number' },
    { name: 'updated_at', type: 'number' }
  ]
});
