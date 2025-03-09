// get

import { Q } from '@nozbe/watermelondb';

import database from '../database';

// create or update using sync

export function* updateBuyer(element: any): Generator<any> {
  try {
    yield database.write(async () => {
      // Find the buyer with the specified ID
      const buyer = await database.get('buyers').query(Q.where('buyer_id', element.id)).fetch();
      // Check if a buyer with the specified ID exists

      if (buyer.length > 0) {
        // Update the buyer
        await buyer[0].update((record: any) => {
          // Update the fields you want here
          record.buyer_id = element.id;
          record.buyer_name = element.name;
        });
      } else {
        // Buyer not found, create a new one
        await database.get('buyers').create((newBuyer: any) => {
          newBuyer.buyer_id = element.id;
          newBuyer.buyer_name = element.name;
        });
      }
    });
  } catch (err) {
    console.error('Error in updateBuyer:', err);
  }
}

// delete

export function* deleteBuyer(buyerId: string): Generator<any> {
  try {
    yield database.write(async () => {
      // Find the buyer with the specified ID
      const buyer = await database.get('buyers').query(Q.where('buyer_id', buyerId)).fetch();

      if (buyer.length > 0) {
        // Delete the buyer
        await buyer[0].destroyPermanently();
      } else {
        console.warn('Buyer not found for deletion.');
      }
    });
  } catch (err) {
    console.error('Error in deleteBuyer:', err);
  }
}
