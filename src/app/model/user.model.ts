export type WithId = {
  id: string;
};

export type LoginData = {
  userName: string;
  password: string;
};

export type UserNoId = LoginData & {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  phone: string;
  addressStreet: string;
  postalCode: string;
  city: string;
  title: string;
  isAcceptingCommunications: boolean;
};

export type User = WithId & UserNoId;

export type LogedUser = {
  user: User;
  token: string;
};
