import { useState } from "react";
import { Cart } from "../components/Cart";
import { Categories } from "../components/Categories";
import { Header } from "../components/Header";
import { Menu } from "../components/Menu";
import { OrderModal } from "../components/OrderModal";
import { Button } from "../components/Shared/Button";
import { products } from "../mocks/products";
import { CartItem } from "../types/CartItem";
import { Product } from "../types/Product";
import {
  CategoriesContainer,
  Container,
  Footer,
  FooterContainer,
  MenuContainer,
} from "./styles";

export function Main() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function handleSaveAddress(address: string) {
    setSelectedAddress(address);
  }

  function handleCancelOrder() {
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
          onCancelOrder={handleCancelOrder}
        />
        <CategoriesContainer>
          <Categories></Categories>
        </CategoriesContainer>
        <MenuContainer>
          <Menu onAddToCart={handleAddToCart} />
        </MenuContainer>
      </Container>
      <Footer>
        <FooterContainer>
          {!selectedAddress && (
            <Button onPress={() => setIsModalVisible(true)}>Novo pedido</Button>
          )}
          {selectedAddress && (
            <Cart
              cartItems={cartItems}
              onAdd={addToCart}
              onDecrement={handleDecrementItem}
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
