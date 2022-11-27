interface User {
  _id: string;
  name: string;
  phone: string;
  password: string;
  address: {
    street: string;
    number: string;
    reference?: string;
  };
  orders?:
    | [
        {
          _id: string;
        }
      ]
    | [];
  token: string;
}
