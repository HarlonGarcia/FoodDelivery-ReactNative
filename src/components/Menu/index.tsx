import { FlatList } from "react-native";
import { products } from "../../mocks/products";
import { formatCurrency } from "../../utils/formatCurrency";
import { PlusCircle } from "../Icons/PlusCircle";
import { Text } from "../Text";
import {
  Product,
  ProductImage,
  ProductDetails,
  Separator,
  AddButton,
} from "./styles";

export function Menu() {
  return (
    <FlatList
      data={products}
      style={{ marginTop: 32 }}
      contentContainerStyle={{ paddingHorizontal: 24 }}
      keyExtractor={(product) => product._id}
      ItemSeparatorComponent={Separator}
      renderItem={({ item: product }) => {
        return (
          <Product>
            <ProductImage
              source={{
                uri: `http://192.168.101.7:3001/uploads/${product.image_url}`,
              }}
            />
            <ProductDetails>
              <Text weight="700">{product.name}</Text>
              <Text size={14} color="#666" style={{ marginVertical: 8 }}>
                {product.description}
              </Text>
              <Text size={14} weight="700">
                {formatCurrency(product.price)}
              </Text>
            </ProductDetails>

            <AddButton>
              <PlusCircle />
            </AddButton>
          </Product>
        );
      }}
    />
  );
}
