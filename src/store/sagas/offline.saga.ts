import axios from 'axios';
import { call, put, select } from 'redux-saga/effects';

import { BASE_URL, CURRENT_CUSTOMERS_URL, CURRENT_ORDER_VARIANCE_URL } from '@/utils/environment';

import { setBuyerData, updateVariance } from '../slices/features/setLineStyle/slice';
import { type RootState } from '..';

interface Customer {
  id: number;
  name: string;
}

interface Style {
  id: number;
  name: string;
  smallName: string;
  smv: number;
  totalOpSmv: number;
  manPower: number;
  fob: number;
  cm: number;
  standardWIP: number;
}

interface OrderEntity {
  id: number;
  name: string;
  styles: Style[];
  quantity: number;
  customer: Customer;
  fob: number;
  cm: number;
  shippingStatus: number;
}

export interface SampleStyle {
  styleName: string;
  styleId: string;
  itemId: string;
  // order: SampleOrder[];
}

export interface SampleOrder {
  orderName: string;
  orderID: string;
}

export interface SampleVariance {
  color: string;
  id: number;
  orderQuantity: number;
  size: string;
}

export interface SampleObject {
  buyerId: string;
  buyerName: string;
  style: SampleStyle[];
}

const callBackAPI = async (payload: any): Promise<undefined | any> => {
  try {
    const token: string = payload?.accessToken !== undefined ? payload.accessToken : '';
    const headers = {
      Authorization: `Bearer ${token}`
    };

    const apiUrl = payload?.url !== undefined ? payload?.url : '';

    const res = await axios
      .get(apiUrl, { headers })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
    return res?.content;
  } catch (error) {
    return undefined; // Or you could return a specific error object here
  }
};
// make buyer and style
function* generatorBuyerDataStyleData(
  payload: any
): Generator<any, SampleObject[] | undefined, any> {
  try {
    let result: SampleObject[] = [];
    const groupedEntities: any = {};
    const customerIdToNameMap: Record<number, string> = {};
    payload?.responseCustomerData?.customers.forEach((customer: Customer) => {
      customerIdToNameMap[customer.id] = customer.name;
    });

    yield payload.responseStyleData.orderEntities.forEach((entity: OrderEntity) => {
      const customerId = entity.customer.id;

      if (groupedEntities[customerId] === undefined) {
        groupedEntities[customerId] = {
          buyerId: customerId.toString(),
          buyerName:
            customerIdToNameMap[customerId] !== undefined
              ? customerIdToNameMap[customerId]
              : 'Unknown',
          style: []
        };
      }
      // Push each style into the respective customer's style array
      entity.styles.forEach(style => {
        const styleIdentifier = `${style.name}_${style.id.toString()}`;
        const existingStyles = groupedEntities[customerId].style;

        // Check if the style already exists
        const isDuplicate = existingStyles.some(
          (existingStyle: { styleName: string; styleId: string }) =>
            `${existingStyle.styleName}_${existingStyle.styleId}` === styleIdentifier
        );

        if (isDuplicate !== true) {
          const newStyle = {
            styleName: style.name,
            styleId: style.id.toString(),
            order: []
          };

          groupedEntities[customerId].style.push(newStyle);
        }
      });

      result = Object.values(groupedEntities);
    });

    yield result;
    return result;
  } catch (err) {
    console.error('Error in callBackAPI:', err);
    return undefined;
  }
}
// make order

function* generatorStyleDataOrderData(
  payload: any
): Generator<any, SampleObject[] | undefined, any> {
  try {
    const result: SampleObject[] = payload.buyerData;
    yield payload.orderData.orderEntities.forEach((order: any) => {
      result.forEach((buyer: any) => {
        if (order.customer.id.toString() === buyer.buyerId.toString()) {
          return buyer.style.forEach((e: any) => {
            order.styles.forEach((obj: any) => {
              if (obj.id.toString() === e.styleId.toString()) {
                const objData = {
                  orderName: order.name,
                  orderID: order.id,
                  variance: []
                };
                e.order.push(objData);
              }
            });
          });
        }
      });
    });
    yield result;
    return result;
  } catch (err) {
    console.error('Error in callBackAPI:', err);
    return undefined;
  }
}

// make variant

function* generatorOrderDataVariants(
  payload: any
): Generator<any, SampleObject[] | undefined, any> {
  try {
    const result: SampleObject[] = payload.buyerData;

    yield payload.orderData.orderEntities.forEach((order: any) => {
      result.forEach((buyer: any) => {
        buyer.style.forEach((orderObj: any) => {
          orderObj.order.forEach((nestedVariants: any) => {
            if (
              nestedVariants.orderName.toString() === order.name.toString() &&
              nestedVariants.orderID.toString() === order.id.toString()
            ) {
              order.styles.forEach((info: any) => {
                if (info.id.toString() === orderObj.styleId.toString()) {
                  if (info.varience.length > 0) {
                    // Concatenate the arrays
                    nestedVariants.variance = nestedVariants.variance.concat(info.varience);
                  }
                }
              });
            }
          });
        });
      });
    });

    yield result;
    return result;
  } catch (err) {
    console.error('Error in callBackAPI:', err);
    return undefined;
  }
}

export function* offlineGetBuyerData(payload: any): Generator<any, void, any> {
  try {
    const { accessToken } = payload;

    const url = BASE_URL + CURRENT_CUSTOMERS_URL + 'currentCustomers';

    const urlStyle = BASE_URL + CURRENT_CUSTOMERS_URL + 'orderEntities?type=mobile';

    const orderVariants = BASE_URL + CURRENT_ORDER_VARIANCE_URL + 'currentOrderVeriance';

    const payloadCustomerIs = {
      accessToken,
      url
    };

    const payloadStyleIs = {
      accessToken,
      url: urlStyle
    };

    const payloadVariantsIs = {
      accessToken,
      url: orderVariants
    };

    const responseCustomerData = yield call(callBackAPI, payloadCustomerIs);
    const responseStyleData = yield call(callBackAPI, payloadStyleIs);
    const responseVariantsData = yield call(callBackAPI, payloadVariantsIs);

    // creating  customer
    if (responseCustomerData !== undefined && responseStyleData !== undefined) {
      const payload = {
        responseCustomerData,
        responseStyleData
      };
      const buyerDataStyleData: SampleObject[] = yield call(generatorBuyerDataStyleData, payload);

      const payloadForOrder = {
        buyerData: buyerDataStyleData,
        orderData: responseStyleData
      };

      const buyerStyleOrderData: SampleObject[] = yield call(
        generatorStyleDataOrderData,
        payloadForOrder
      );

      const payloadForValiant = {
        buyerData: buyerStyleOrderData,
        orderData: responseVariantsData
      };

      // make variant

      const buyerStyleOrderVariant: SampleObject[] = yield call(
        generatorOrderDataVariants,
        payloadForValiant
      );

      yield put(setBuyerData(buyerStyleOrderVariant));

      // sync time color and size update
      yield call(updateColorSize, buyerStyleOrderVariant);
    }
  } catch (error) {
    // Handle error if needed
    // ToastPopUp('Error occurred');
  }
}

// update color and size for endTable Page

export function* updateColorSize(payload: any): Generator<any, void, any> {
  try {
    if (payload !== null) {
      // login time or sync Time
      // for color

      const buyerId = yield select((state: RootState) => state.setLineStyle.buyerId);
      const orderId = yield select((state: RootState) => state.setLineStyle.orderId);
      const styleID = yield select((state: RootState) => state.setLineStyle.styleID);

      let variance: any = [];

      if (buyerId !== '' && orderId !== '' && styleID !== '') {
        yield payload.forEach((e: any) => {
          if (e.buyerId.toString() === buyerId.toString()) {
            if (e.style.length > 0) {
              e.style.forEach((style: any) => {
                if (style.styleId.toString() === styleID.toString()) {
                  if (style.order.length > 0) {
                    style.order.forEach((order: any) => {
                      // Use object destructuring for order
                      const { orderID, variance: orderVariance } = order;

                      if (orderID.toString() === orderId.toString()) {
                        variance = orderVariance;
                      }
                      // if (order.orderID.toString() === orderId.toString()) {
                      //   variance = order.variance;
                      // }
                    });
                  }
                }
              });
            }
          }
        });
      }

      //
      yield put(updateVariance(variance));
    }
  } catch (err) {
    console.error('error in updateColorSize');
  }
}
