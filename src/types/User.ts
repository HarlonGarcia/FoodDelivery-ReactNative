interface User {
  _id: string;
  name: string;
  phone: string;
  address: {
    street: string;
    number: string;
    reference?: string;
  };
  orders: [
    {
      _id: string;
    }
  ];
  token: string;
}
