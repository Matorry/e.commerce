import { Product } from './product.model';

export type WithId = {
  id: string;
};

export type LoginData = {
  userName: string;
  password: string;
};

export type Purchase = {
  products: Product[];
  date: string;
  amount: string;
  isOpen: boolean;
};

export type UserNoId = LoginData & {
  firstName: string;
  lastName: string;
  email: string;
  addressStreet: string;
  postalCode: string;
  city: string;
  purchaseHistory: Purchase[];
  role: 'user' | 'admin';
};

export type User = WithId & UserNoId;

export type LogedUser = {
  user: User;
  token: string;
};
