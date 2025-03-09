import database from '..';

export const deleteAllMasterInDB = async (): Promise<void> => {
  try {
    await database.write(async () => {
      // Fetch all records from the collections you want to clear
      const buyers = await database.collections.get('buyers').query().fetch();

      // Prepare records for deletion
      const deleted = buyers.map(buyers => buyers.prepareDestroyPermanently());

      // Perform the batch delete
      await database.batch(...deleted);

      // Fetch all records from the collections you want to clear
      const orders = await database.collections.get('orders').query().fetch();

      // Prepare records for deletion
      const deletedOrders = orders.map(orders => orders.prepareDestroyPermanently());

      // Perform the batch delete
      await database.batch(...deletedOrders);

      // Fetch all records from the collections you want to clear
      const styles = await database.collections.get('styles').query().fetch();

      // Prepare records for deletion
      const deletedStyles = styles.map(styles => styles.prepareDestroyPermanently());

      // Perform the batch delete
      await database.batch(...deletedStyles);

      // Fetch all records from the collections you want to clear
      const variances = await database.collections.get('variances').query().fetch();

      // Prepare records for deletion
      const deletedVariances = variances.map(variances => variances.prepareDestroyPermanently());

      // Perform the batch delete
      await database.batch(...deletedVariances);
    });
  } catch (e) {
    console.warn('Something is wrong in handle Clear all Data deleteAllMasterInDB', e);
  }
};
