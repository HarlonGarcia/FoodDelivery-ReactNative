import { useState } from "react";
import { ActivityIndicator } from "react-native";

import { Cart } from "../components/Cart";
import { Categories } from "../components/Categories";
import { Header } from "../components/Header";
import { Empty } from "../components/Icons/Empty";
import { Menu } from "../components/Menu";
import { OrderModal } from "../components/OrderModal";
import { Button } from "../components/Shared/Button";
import { Text } from "../components/Text";
import { CartItem } from "../types/CartItem";
import { Product } from "../types/Product";

import {
  CategoriesContainer,
  CenteredContainer,
  Container,
  Footer,
  FooterContainer,
  MenuContainer,
} from "./styles";

export function Main() {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  function handleSaveAddress(address: string) {
    setSelectedAddress(address);
  }

  function handleCleanOrder() {
    setSelectedAddress("");
    setCartItems([]);
  }

  function handleAddToCart(product: Product) {
    if (!selectedAddress) {
      setIsModalVisible(true);
    }
    addToCart(product);
  }

  function handleDecrementItem(product: Product) {
    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(
        (cartItems) => cartItems.product._id === product._id
      );

      const item = prevState[itemIndex];

      const newCartItems = [...prevState];

      if (item.quantity === 1) {
        newCartItems.splice(itemIndex, 1);

        return newCartItems;
      }

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity - 1,
      };

      return newCartItems;
    });
  }

  function addToCart(product: Product) {
    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(
        (cartItems) => cartItems.product._id === product._id
      );

      if (itemIndex < 0) {
        return prevState.concat({
          product,
          quantity: 1,
        });
      }

      const newCartItems = [...prevState];
      const item = newCartItems[itemIndex];
      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity + 1,
      };

      return newCartItems;
    });
  }

  return (
    <>
      <Container>
        <Header
          selectedAddress={selectedAddress}
          onCancelOrder={handleCleanOrder}
        />

        {isLoading ? (
          <CenteredContainer>
            <ActivityIndicator color="#FF5700" size="large" />
          </CenteredContainer>
        ) : (
          <>
            <CategoriesContainer>
              <Categories></Categories>
            </CategoriesContainer>

            {products.length > 0 ? (
              <MenuContainer>
                <Menu onAddToCart={handleAddToCart} products={products} />
              </MenuContainer>
            ) : (
              <CenteredContainer>
                <Empty />
                <Text color="#666" style={{ marginTop: 24 }}>
                  Nenhum produto foi encontrado {":("}
                </Text>
              </CenteredContainer>
            )}
          </>
        )}
      </Container>

      <Footer>
        <FooterContainer>
          {!selectedAddress && (
            <Button
              onPress={() => setIsModalVisible(true)}
              disabled={isLoading}
            >
              Novo pedido
            </Button>
          )}
          {selectedAddress && (
            <Cart
              cartItems={cartItems}
              onAdd={addToCart}
              onDecrement={handleDecrementItem}
              onConfirmOrder={handleCleanOrder}
            ></Cart>
          )}
        </FooterContainer>
      </Footer>

      <OrderModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSaveAddress}
      />
    </>
  );
}
