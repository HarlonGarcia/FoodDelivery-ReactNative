import { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { CartItem } from "../../types/CartItem";
import { Product } from "../../types/Product";
import { formatCurrency } from "../../utils/formatCurrency";
import { MinusCircle } from "../Icons/MinusCircle";
import { PlusCircle } from "../Icons/PlusCircle";
import { OrderConfirmedModal } from "../OrderCofirmedModal";
import { Button } from "../Shared/Button";
import { Text } from "../Text";
import {
  Actions,
  Image,
  Item,
  ProductContainer,
  ProductDetails,
  QuantityContainer,
  Summary,
  TotalContainer,
} from "./styles";

interface CartProps {
  cartItems: CartItem[];
  onAdd: (product: Product) => void;
  onDecrement: (product: Product) => void;
}

export function Cart({ cartItems, onAdd, onDecrement }: CartProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const total = cartItems.reduce((acc, { quantity, product }) => {
    return acc + quantity * product.price;
  }, 0);

  function handleConfirmOrder() {}

  return (
    <>
      <OrderConfirmedModal visible={isModalVisible} />
      {cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          keyExtractor={(cartItem) => cartItem.product._id}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20, maxHeight: 150 }}
          renderItem={({ item: cartItem }) => (
            <Item>
              <ProductContainer>
                <Image
                  source={{
                    uri: `http://192.168.101.7:3001/uploads/${cartItem.product.image_url}`,
                  }}
                />

                <QuantityContainer>
                  <Text size={14} color="#666">
                    {cartItem.quantity}x
                  </Text>
                </QuantityContainer>
                <ProductDetails>
                  <Text size={14} weight="700">
                    {cartItem.product.name}
                  </Text>
                  <Text size={14} color="#666" style={{ marginTop: 4 }}>
                    {formatCurrency(cartItem.product.price)}
                  </Text>
                </ProductDetails>
              </ProductContainer>
              <Actions>
                <TouchableOpacity onPress={() => onAdd(cartItem.product)}>
                  <PlusCircle />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginLeft: 16 }}
                  onPress={() => onDecrement(cartItem.product)}
                >
                  <MinusCircle />
                </TouchableOpacity>
              </Actions>
            </Item>
          )}
        />
      ) : null}

      <Summary>
        <TotalContainer>
          {cartItems.length > 0 ? (
            <>
              <Text color="#666">Total</Text>
              <Text size={20} weight="700">
                {formatCurrency(total)}
              </Text>
            </>
          ) : null}
          {cartItems.length <= 0 ? (
            <Text color="#999">Seu carrinho está vazio</Text>
          ) : null}
        </TotalContainer>
        <Button onPress={handleConfirmOrder} disabled={cartItems.length <= 0}>
          Confimar pedido
        </Button>
      </Summary>
    </>
  );
}
