interface Style {
  id: number;
  name: string;
  smallName?: string;
  smv: number;
  totalOpSmv: number;
  manPower: number;
  fob: number;
  cm: number;
  standardWIP: number;
}

interface Customer {
  id: number;
  name: string;
}

export interface OrderEntity {
  id: number;
  name: string;
  styles: Style[];
  quantity: number;
  customer: Customer;
  fob: number;
  cm: number;
  shippingStatus: number;
}

export interface IOrderEnticesTypes {
  timestamp: number;
  status: string;
  statusCode: number;
  message: string;
  totalCount: number;
  numberOfElements: number;
  content: {
    orderEntities: OrderEntity[];
    lastSyncAt: number[];
  };
}
