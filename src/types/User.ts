interface User {
  name: string;
  address: {
    street: string;
    number: string;
    reference?: string;
  };
}
