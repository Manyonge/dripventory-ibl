import { TableNode } from "@table-library/react-table-library";
export interface Product extends TableNode {
  _id: string;
  name: string;
  buyingPrice: number;
  restockDate: string;
  sellingPrice: number;
  sellingDate: string;
  quantity: number;
}

export interface Sale extends TableNode {
  _id?: string;
  productName: string;
  quantity: number;
  saleDate: string;
  sellingPrice: number;
  customerContact: string;
}
export interface Delivery extends TableNode {
  _id: string;
  productName: string;
  customerContact: string;
  deliveryMethod: string;
  status: string;
}
export interface Customer extends TableNode {
  _id: string;
  name: string;
  contact: string;
}
