// get

import { Q } from '@nozbe/watermelondb';

import database from '../database';

// create or update using sync

export function* updateVariance(element: any): Generator<any> {
  try {
    yield database.write(async () => {
      // Find the style with the specified ID
      const variance = await database
        .get('variances')
        .query(Q.where('varianceId', element.id))
        .fetch();

      // Check if a style with the specified ID exists
      if (variance.length === 0) {
        // need to delete

        await database.get('variances').create((newBuyer: any) => {
          newBuyer.varianceId = element.id;
          newBuyer.size = element.size;
          newBuyer.color = element.color;
          newBuyer.orderQuantity = element.orderQuantity;
          newBuyer.orderId = element.orderId;
          // newBuyer.style_id = element.id;
          // newBuyer.style_name = element.name;
        });

        // Update the buyer
      } else {
        // style not found, create a new one

        if (element.isDeleted === true) {
          if (variance.length > 0) {
            // Delete the variance
            await variance[0].destroyPermanently();
          } else {
            console.warn('variances not found for deletion.');
          }
        } else {
          // Update the fields you want here
          await variance[0].update((record: any) => {
            record.varianceId = element.id;
            record.size = element.size;
            record.color = element.color;
            record.orderQuantity = element.orderQuantity;
            record.orderId = element.orderId;
            // record.style_id = element.id;
            // record.style_name = element.name;
          });
        }
      }
    });
  } catch (err) {
    console.error('Error in updateVariance:', err);
  }
}
