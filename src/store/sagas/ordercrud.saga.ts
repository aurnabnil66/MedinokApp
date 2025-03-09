// get

import { Q } from '@nozbe/watermelondb';

import database from '../database';

// create or update using sync

export function* updateOrder(element: any): Generator<any> {
  try {
    yield database.write(async () => {
      // Find the style with the specified ID
      const order = await database.get('orders').query(Q.where('orderId', element.id)).fetch();
      const style: any = await database
        .get('styles')
        .query(Q.where('style_id', element.styleId))
        .fetch();

      if (style.length > 0) {
        // check style exits
        const statusCheck = style.filter(
          (e: any) => e.buyer_id === element.customerId && e.style_id === element.styleId
        );
        if (statusCheck.length === 0) {
          // not found style
          await database.get('styles').create((newBuyer: any) => {
            newBuyer.style_id = element.styleId;
            newBuyer.style_name = style[0].style_name;
            newBuyer.buyer_id = element.customerId;
            newBuyer.item_id = style[0].itemId;
          });
        } else {
          // style  available
          // await database.get('styles').create((newBuyer: any) => {
          //   newBuyer.style_id = element.id;
          //   newBuyer.style_name = element.name;
          //   newBuyer.buyer_id = element.customerId;
          //   newBuyer.item_id = element.itemId;
          //   // newBuyer.style_id = element.id;
          //   // newBuyer.style_name = element.name;
          // });
        }
      }
      // Check if a style with the specified ID exists
      if (order.length > 0) {
        // Update the buyer

        const dataNew = order.filter((e: any) => {
          return (
            element.customerId === e.buyer_id &&
            element.styleId === e.style_id &&
            element.id === e.orderId
          );

          // if (
          //   element.customerId === e.buyer_id &&
          //   element.styleId === e.style_id &&
          //   element.id === e.orderId
          // ) {
          //   return e;
          // }
        });

        if (dataNew.length === 0) {
          await database.get('orders').create((newBuyer: any) => {
            newBuyer.orderId = element.id;
            newBuyer.name = element.name;
            newBuyer.style_id = element.styleId;
            newBuyer.buyer_id = element.customerId;
          });
        }

        // console.log('dataNew', dataNew);

        // update

        // await order[0].update((record: any) => {
        //   // Update the fields you want here
        //   record.orderId = element.id;
        //   record.name = element.name;
        //   record.style_id = element.styleId;
        //   record.buyer_id = element.customerId;
        //   // record.style_id = element.id;
        //   // record.style_name = element.name;
        // });
      } else {
        // style not found, create a new one
        await database.get('orders').create((newBuyer: any) => {
          newBuyer.orderId = element.id;
          newBuyer.name = element.name;
          newBuyer.style_id = element.styleId;
          newBuyer.buyer_id = element.customerId;
        });
      }
    });
  } catch (err) {
    console.error('Error in updateOrder:', err);
  }
}

// delete

export function* deleteOrder(orderId: string): Generator<any> {
  try {
    yield database.write(async () => {
      // Find the buyer with the specified ID
      const orders = await database.get('orders').query(Q.where('orderId', orderId)).fetch();

      if (orders.length > 0) {
        // Delete the buyer
        await orders[0].destroyPermanently();
      } else {
        console.warn('order not found for deletion.');
      }
    });
  } catch (err) {
    console.error('Error in deleteOrder:', err);
  }
}
