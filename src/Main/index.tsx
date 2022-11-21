import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { api } from "../utils/api";

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
import { Category } from "../types/Category";
import { Address } from "../types/Address";

export function Main() {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [user, setUser] = useState<null | User>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  useEffect(() => {
    Promise.all([api.get("/categories"), api.get("/products")]).then(
      ([categoriesResponse, productsResponse]) => {
        setCategories(categoriesResponse.data);
        setProducts(productsResponse.data);
        setIsLoading(false);
      }
    );
  }, []);

  async function handleSelectedCategory(categoryId: string) {
    const route = !categoryId
      ? "/products"
      : `/categories/${categoryId}/products`;

    setIsLoadingProducts(true);

    const { data } = await api.get(route);
    setProducts(data);
    setIsLoadingProducts(false);
  }

  function handleSaveAddress(address: Address) {
    setUser({
      name: "Harlon",
      address,
    });
  }

  function handleCleanOrder() {
    setUser(null);
    setCartItems([]);
  }

  function handleAddToCart(product: Product) {
    if (!user) {
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
        <Header user={user} onCancelOrder={handleCleanOrder} />

        {isLoading ? (
          <CenteredContainer>
            <ActivityIndicator color="#FF5700" size="large" />
          </CenteredContainer>
        ) : (
          <>
            <CategoriesContainer>
              <Categories
                categories={categories}
                onSelectCategory={handleSelectedCategory}
              />
            </CategoriesContainer>

            {isLoadingProducts ? (
              <CenteredContainer>
                <ActivityIndicator color="#FF5700" size="large" />
              </CenteredContainer>
            ) : (
              <>
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
          </>
        )}
      </Container>

      <Footer>
        <FooterContainer>
          {!user && (
            <Button
              onPress={() => setIsModalVisible(true)}
              disabled={isLoading}
            >
              Novo pedido
            </Button>
          )}
          {user && (
            <Cart
              cartItems={cartItems}
              onAdd={addToCart}
              onDecrement={handleDecrementItem}
              onConfirmOrder={handleCleanOrder}
              user={user}
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
