import { useState } from "react";
import { FlatList } from "react-native";
import { Product } from "../../types/Product";
import { formatCurrency } from "../../utils/formatCurrency";
import { PlusCircle } from "../Icons/PlusCircle";
import { ProductModal } from "../ProductModal";
import { Text } from "../Text";
import {
  ProductContainer,
  ProductImage,
  ProductDetails,
  Separator,
  AddButton,
} from "./styles";

interface MenuProps {
  onAddToCart: (product: Product) => void;
  products: Product[];
  isUserLogged: boolean;
}

export function Menu({ onAddToCart, products, isUserLogged }: MenuProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);

  function handleOpenModal(product: Product) {
    setIsModalVisible(true);
    setSelectedProduct(product);
  }

  return (
    <>
      <ProductModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        product={selectedProduct}
        onAddToCart={onAddToCart}
      />
      <FlatList
        data={products}
        style={{ marginTop: 32 }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        keyExtractor={(product) => product._id}
        ItemSeparatorComponent={Separator}
        renderItem={({ item: product }) => {
          return (
            <ProductContainer onPress={() => handleOpenModal(product)}>
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

              {isUserLogged ? (
                <AddButton onPress={() => onAddToCart(product)}>
                  <PlusCircle />
                </AddButton>
              ) : null}
            </ProductContainer>
          );
        }}
      />
    </>
  );
}
