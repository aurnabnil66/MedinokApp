// get

import { Q } from '@nozbe/watermelondb';

import database from '../database';

// create or update using sync

export function* updateStyle(element: any): Generator<any> {
  try {
    yield database.write(async () => {
      // Find the style with the specified ID
      const style = await database.get('styles').query(Q.where('style_id', element.id)).fetch();
      // Check if a style with the specified ID exists

      if (style.length > 0) {
        // Update the buyer
        await style[0].update((record: any) => {
          // Update the fields you want here
          record.style_id = element.id;
          record.style_name = element.name;
          record.buyer_id = element.customerId;
          record.item_id = element.itemId;
          // record.style_id = element.id;
          // record.style_name = element.name;
        });
      } else {
        // style not found, create a new one
        await database.get('styles').create((newBuyer: any) => {
          newBuyer.style_id = element.id;
          newBuyer.style_name = element.name;
          newBuyer.buyer_id = element.customerId;
          newBuyer.item_id = element.itemId;
          // newBuyer.style_id = element.id;
          // newBuyer.style_name = element.name;
        });
      }
    });
  } catch (err) {
    console.error('Error in updateStyle:', err);
  }
}

// delete

export function* deleteStyle(styleId: string): Generator<any> {
  try {
    yield database.write(async () => {
      // Find the styles with the specified ID
      const styles = await database.get('styles').query(Q.where('style_id', styleId)).fetch();

      if (styles.length > 0) {
        // Delete the buyer
        await styles[0].destroyPermanently();
      } else {
        console.warn('styles not found for deletion.');
      }
    });
  } catch (err) {
    console.error('Error in deleteStyle:', err);
  }
}
