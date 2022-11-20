export interface Product {
  _id: string;
  name: string;
  description: string;
  image_url: string;
  price: number;
  ingredients: {
    name: string;
    icon: string;
    _id: string;
  }[];
}
