import { TouchableOpacity } from "react-native";
import { Text } from "../Text";
import { Container, Content, OrderHeader, OrderPlaced } from "./styles";

interface HeaderProps {
  selectedAddress: string;
  onCancelOrder: () => void;
}

export function Header({ selectedAddress, onCancelOrder }: HeaderProps) {
  return (
    <Container>
      {!selectedAddress && (
        <>
          <Text size={14} opacity={0.9}>
            Bem vindo(a) ao
          </Text>
          <Text size={24} weight="900">
            Food
            <Text size={24}>Delivery</Text>
          </Text>
        </>
      )}
      {selectedAddress && (
        <Content>
          <OrderHeader>
            <Text size={24} weight="700">
              Pedido
            </Text>
            <TouchableOpacity onPress={onCancelOrder}>
              <Text size={14} weight="700" color="#E20000">
                Cancelar pedido
              </Text>
            </TouchableOpacity>
          </OrderHeader>
          <OrderPlaced>
            <Text color="#666">{selectedAddress}</Text>
          </OrderPlaced>
        </Content>
      )}
    </Container>
  );
}
